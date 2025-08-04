import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Get configuration
const config = new pulumi.Config();
const domainName = config.require("domainName");
const additionalDomains = config.getObject<string[]>("additionalDomains") || [];

// All domains (primary + additional)
const allDomains = [domainName, `www.${domainName}`, ...additionalDomains, ...additionalDomains.map(d => `www.${d}`)];

// S3 Bucket for website hosting
const bucket = new aws.s3.Bucket("website", {
    bucket: domainName
});

// S3 Bucket website configuration
const bucketWebsite = new aws.s3.BucketWebsiteConfiguration("website", {
    bucket: bucket.id,
    indexDocument: {
        suffix: "index.html"
    },
    errorDocument: {
        key: "404.html"
    }
});

// S3 Bucket public access configuration
const bucketPublicAccess = new aws.s3.BucketPublicAccessBlock("website", {
    bucket: bucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false
});

// S3 Bucket policy for public read access
const bucketPolicy = new aws.s3.BucketPolicy("website", {
    bucket: bucket.id,
    policy: bucket.arn.apply(arn => JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `${arn}/*`
        }]
    }))
});

// Route53 hosted zone (data source - assumes it exists)
const hostedZone = aws.route53.getZone({
    name: domainName,
    privateZone: false
});

// ACM Certificate for HTTPS (us-east-1 required for CloudFront)
const certificate = new aws.acm.Certificate("website", {
    domainName: domainName,
    subjectAlternativeNames: allDomains.filter(d => d !== domainName),
    validationMethod: "DNS"
}, {
    provider: new aws.Provider("us-east-1", { region: "us-east-1" })
});

// Certificate validation records
const certificateValidationRecords = certificate.domainValidationOptions.apply(options => 
    options.map(option => new aws.route53.Record(`validation-${option.domainName}`, {
        allowOverwrite: true,
        name: option.resourceRecordName,
        records: [option.resourceRecordValue],
        ttl: 60,
        type: option.resourceRecordType,
        zoneId: hostedZone.then(zone => zone.zoneId)
    }))
);

// Certificate validation
const certificateValidation = new aws.acm.CertificateValidation("website", {
    certificateArn: certificate.arn,
    validationRecordFqdns: pulumi.all(certificateValidationRecords).apply(records => 
        records.map(record => record.fqdn)
    )
}, {
    provider: new aws.Provider("us-east-1", { region: "us-east-1" })
});

// CloudFront Distribution
const distribution = new aws.cloudfront.Distribution("website", {
    origins: [{
        domainName: bucketWebsite.websiteEndpoint,
        originId: `S3-${domainName}`,
        customOriginConfig: {
            httpPort: 80,
            httpsPort: 443,
            originProtocolPolicy: "http-only",
            originSslProtocols: ["TLSv1.2"]
        }
    }],
    enabled: true,
    isIpv6Enabled: true,
    defaultRootObject: "index.html",
    aliases: allDomains,
    
    defaultCacheBehavior: {
        allowedMethods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
        cachedMethods: ["GET", "HEAD"],
        targetOriginId: `S3-${domainName}`,
        compress: true,
        viewerProtocolPolicy: "redirect-to-https",
        forwardedValues: {
            queryString: false,
            cookies: {
                forward: "none"
            }
        },
        minTtl: 0,
        defaultTtl: 3600,
        maxTtl: 86400
    },
    
    // Cache behavior for static assets (long cache)
    orderedCacheBehaviors: [{
        pathPattern: "/_app/immutable/*",
        allowedMethods: ["GET", "HEAD", "OPTIONS"],
        cachedMethods: ["GET", "HEAD"],
        targetOriginId: `S3-${domainName}`,
        compress: true,
        forwardedValues: {
            queryString: false,
            cookies: {
                forward: "none"
            }
        },
        minTtl: 31536000, // 1 year
        defaultTtl: 31536000,
        maxTtl: 31536000,
        viewerProtocolPolicy: "redirect-to-https"
    }],
    
    priceClass: "PriceClass_100", // North America and Europe only
    restrictions: {
        geoRestriction: {
            restrictionType: "none"
        }
    },
    
    viewerCertificate: {
        acmCertificateArn: certificateValidation.certificateArn,
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1.2_2021"
    },
    
    // Custom error pages
    customErrorResponses: [
        {
            errorCode: 404,
            responseCode: 404,
            responsePagePath: "/404.html"
        },
        {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html" // SPA routing
        }
    ]
});

// Route53 records for main domain
const websiteRecord = new aws.route53.Record("website", {
    zoneId: hostedZone.then(zone => zone.zoneId),
    name: domainName,
    type: "A",
    aliases: [{
        name: distribution.domainName,
        zoneId: distribution.hostedZoneId,
        evaluateTargetHealth: false
    }]
});

// Route53 records for www subdomain
const websiteWwwRecord = new aws.route53.Record("website-www", {
    zoneId: hostedZone.then(zone => zone.zoneId),
    name: `www.${domainName}`,
    type: "A",
    aliases: [{
        name: distribution.domainName,
        zoneId: distribution.hostedZoneId,
        evaluateTargetHealth: false
    }]
});

// Export important values
export const bucketName = bucket.id;
export const distributionId = distribution.id;
export const distributionDomainName = distribution.domainName;
export const websiteUrl = `https://${domainName}`;