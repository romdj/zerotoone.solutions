import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

// Get configuration
const config = new pulumi.Config();
const domainName = config.require("domainName");
const additionalDomains = config.getObject<string[]>("additionalDomains") || [];

// All domains (primary + additional)
const allDomains = [domainName, `www.${domainName}`, ...additionalDomains, ...additionalDomains.map(d => `www.${d}`)];

// Route53 hosted zone (data source - assumes it exists)
const hostedZone = aws.route53.getZone({
    name: domainName,
    privateZone: false
});

// US-East-1 provider for ACM certificates (required for CloudFront)
const usEast1Provider = new aws.Provider("us-east-1", { region: "us-east-1" });

// ACM Certificate for HTTPS
const certificate = new aws.acm.Certificate("website-cert", {
    domainName: domainName,
    subjectAlternativeNames: allDomains.filter(d => d !== domainName),
    validationMethod: "DNS"
}, { provider: usEast1Provider });

// Certificate validation records
const validationRecords = certificate.domainValidationOptions.apply(options => {
    const records: aws.route53.Record[] = [];
    options.forEach((option, index) => {
        records.push(new aws.route53.Record(`cert-validation-${index}`, {
            allowOverwrite: true,
            name: option.resourceRecordName,
            records: [option.resourceRecordValue],
            ttl: 60,
            type: option.resourceRecordType,
            zoneId: hostedZone.then(zone => zone.zoneId)
        }));
    });
    return records;
});

// Certificate validation
const certificateValidation = new aws.acm.CertificateValidation("website-cert-validation", {
    certificateArn: certificate.arn,
    validationRecordFqdns: validationRecords.apply(records => 
        records.map(record => record.fqdn)
    )
}, { provider: usEast1Provider });

// S3 bucket for static website hosting  
const bucket = new aws.s3.Bucket("website-bucket", {
    bucket: domainName,
    forceDestroy: true // Allow Pulumi to delete non-empty bucket
});

// Configure bucket for static website hosting
const bucketWebsite = new aws.s3.BucketWebsiteConfiguration("website-config", {
    bucket: bucket.id,
    indexDocument: { suffix: "index.html" },
    errorDocument: { key: "404.html" }
});

// Enable public access to the bucket
const bucketPublicAccessBlock = new aws.s3.BucketPublicAccessBlock("website-public-access", {
    bucket: bucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false
});

// Bucket policy for public read access
const bucketPolicy = new aws.s3.BucketPolicy("website-bucket-policy", {
    bucket: bucket.id,
    policy: bucket.arn.apply(bucketArn => JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `${bucketArn}/*`
        }]
    }))
}, { dependsOn: [bucketPublicAccessBlock] });

// CloudFront function for subdomain routing
const subdomainRouterFunction = new aws.cloudfront.Function("subdomain-router", {
    name: "subdomain-router",
    runtime: "cloudfront-js-1.0",
    comment: "Routes old.zerotoone.solutions to /old/ path",
    publish: true,
    code: fs.readFileSync(__dirname + "/subdomain-router.js", "utf8")
});

// CloudFront distribution
const distribution = new aws.cloudfront.Distribution("website-cdn", {
    enabled: true,
    isIpv6Enabled: true,
    defaultRootObject: "index.html",
    aliases: allDomains,
    
    origins: [{
        originId: `S3-${domainName}`,
        domainName: bucketWebsite.websiteEndpoint,
        customOriginConfig: {
            httpPort: 80,
            httpsPort: 443,
            originProtocolPolicy: "http-only",
            originSslProtocols: ["TLSv1.2"]
        }
    }],
    
    defaultCacheBehavior: {
        targetOriginId: `S3-${domainName}`,
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"],
        cachedMethods: ["GET", "HEAD"],
        compress: true,
        forwardedValues: {
            queryString: false,
            cookies: { forward: "none" },
            headers: ["Host"]
        },
        minTtl: 0,
        defaultTtl: 3600,
        maxTtl: 86400,
        functionAssociations: [{
            eventType: "viewer-request",
            functionArn: subdomainRouterFunction.arn
        }]
    },
    
    // Route to old/ subdirectory for old.zerotoone.solutions
    orderedCacheBehaviors: [
        {
            pathPattern: "/old/*",
            targetOriginId: `S3-${domainName}`,
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            cachedMethods: ["GET", "HEAD"],
            compress: true,
            forwardedValues: {
                queryString: false,
                cookies: { forward: "none" },
                headers: ["Host"]
            },
            minTtl: 0,
            defaultTtl: 3600,
            maxTtl: 86400,
            functionAssociations: [{
                eventType: "viewer-request",
                functionArn: subdomainRouterFunction.arn
            }]
        },
        {
            // Long-term caching for immutable assets
            pathPattern: "/_app/immutable/*",
            targetOriginId: `S3-${domainName}`,
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            cachedMethods: ["GET", "HEAD"],
            compress: true,
            forwardedValues: {
                queryString: false,
                cookies: { forward: "none" }
            },
            minTtl: 31536000, // 1 year
            defaultTtl: 31536000,
            maxTtl: 31536000
        }
    ],
    
    priceClass: "PriceClass_100", // US, Canada, Europe
    
    restrictions: {
        geoRestriction: { restrictionType: "none" }
    },
    
    viewerCertificate: {
        acmCertificateArn: certificateValidation.certificateArn,
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1.2_2021"
    },
    
    // Custom error pages for SPA routing
    customErrorResponses: [
        {
            errorCode: 404,
            responseCode: 404,
            responsePagePath: "/404.html"
        },
        {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html" // Handle SPA client-side routing
        }
    ]
});

// DNS records pointing to CloudFront
const mainRecord = new aws.route53.Record("website-dns", {
    zoneId: hostedZone.then(zone => zone.zoneId),
    name: domainName,
    type: "A",
    aliases: [{
        name: distribution.domainName,
        zoneId: distribution.hostedZoneId,
        evaluateTargetHealth: false
    }]
});

const wwwRecord = new aws.route53.Record("website-www-dns", {
    zoneId: hostedZone.then(zone => zone.zoneId),
    name: `www.${domainName}`,
    type: "A",
    aliases: [{
        name: distribution.domainName,
        zoneId: distribution.hostedZoneId,
        evaluateTargetHealth: false
    }]
});

// DNS record for old subdomain
const oldRecord = new aws.route53.Record("website-old-dns", {
    zoneId: hostedZone.then(zone => zone.zoneId),
    name: `old.${domainName}`,
    type: "A",
    aliases: [{
        name: distribution.domainName,
        zoneId: distribution.hostedZoneId,
        evaluateTargetHealth: false
    }]
});

// Export important values
export const bucketName = bucket.id;
export const bucketWebsiteEndpoint = bucketWebsite.websiteEndpoint;
export const distributionId = distribution.id;
export const distributionDomainName = distribution.domainName;
export const certificateArn = certificateValidation.certificateArn;
export const websiteUrl = `https://${domainName}`;