import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

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

// ACM Certificate for HTTPS (us-east-1 required for CloudFront)
const usEast1Provider = new aws.Provider("us-east-1", { region: "us-east-1" });

const certificate = new aws.acm.Certificate("website", {
    domainName: domainName,
    subjectAlternativeNames: allDomains.filter(d => d !== domainName),
    validationMethod: "DNS"
}, { provider: usEast1Provider });

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
}, { provider: usEast1Provider });

// S3 Website Bucket using Crosswalk (much simpler!)
const website = new awsx.s3.WebsiteBucket("website", {
    name: domainName,
    indexDocument: "index.html",
    errorDocument: "404.html"
});

// CloudFront Distribution using Crosswalk
const distribution = new awsx.cloudfront.Distribution("website", {
    origins: [{
        originId: `S3-${domainName}`,
        domainName: website.websiteEndpoint,
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
        targetOriginId: `S3-${domainName}`,
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
        cachedMethods: ["GET", "HEAD"],
        compress: true,
        forwardedValues: {
            queryString: false,
            cookies: { forward: "none" }
        },
        minTtl: 0,
        defaultTtl: 3600,
        maxTtl: 86400
    },
    
    // Cache behavior for static assets (long cache)
    orderedCacheBehaviors: [{
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
    }],
    
    priceClass: "PriceClass_100",
    restrictions: {
        geoRestriction: { restrictionType: "none" }
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
export const bucketName = website.bucketName;
export const bucketWebsiteEndpoint = website.websiteEndpoint;
export const distributionId = distribution.id;
export const distributionDomainName = distribution.domainName;
export const websiteUrl = `https://${domainName}`;