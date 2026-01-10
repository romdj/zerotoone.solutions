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
    subjectAlternativeNames: [
        `www.${domainName}`,
        `old.${domainName}`,
        ...allDomains.filter(d => d !== domainName && d !== `www.${domainName}`)
    ],
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

// S3 bucket for CloudFront access logs
const loggingBucket = new aws.s3.Bucket("analytics-logs", {
    bucket: `analytics-${domainName}`,
    forceDestroy: true
});

// Enable ACLs on the logging bucket (required for CloudFront logging)
const loggingBucketOwnership = new aws.s3.BucketOwnershipControls("analytics-logs-ownership", {
    bucket: loggingBucket.id,
    rule: {
        objectOwnership: "BucketOwnerPreferred"
    }
});

// Lifecycle rule to delete old logs after 90 days (keep costs low)
const loggingBucketLifecycle = new aws.s3.BucketLifecycleConfiguration("analytics-logs-lifecycle", {
    bucket: loggingBucket.id,
    rules: [{
        id: "delete-old-logs",
        status: "Enabled",
        expiration: {
            days: 90
        }
    }]
});

// Grant CloudFront permission to write logs
const loggingBucketAcl = new aws.s3.BucketAcl("analytics-logs-acl", {
    bucket: loggingBucket.id,
    acl: "log-delivery-write"
}, { dependsOn: [loggingBucketOwnership] });

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

// Main distribution only serves the new site now

// CloudFront distribution
const distribution = new aws.cloudfront.Distribution("website-cdn", {
    enabled: true,
    isIpv6Enabled: true,
    defaultRootObject: "index.html",
    aliases: allDomains,

    // Enable access logging for analytics
    loggingConfig: {
        bucket: loggingBucket.bucketDomainName,
        prefix: "cloudfront-logs/",
        includeCookies: false
    },

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
        // No function associations needed for main site
    },
    
    // Long-term caching for immutable assets
    orderedCacheBehaviors: [
        {
            pathPattern: "/_app/immutable/*",
            targetOriginId: `S3-${domainName}`,
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD"],
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
            responseCode: 200,
            responsePagePath: "/index.html" // Handle SPA client-side routing
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

// Old site infrastructure
const oldBucketName = `old.${domainName}`;
const oldBucket = new aws.s3.Bucket("old-website-bucket", {
    bucket: oldBucketName
});

const oldBucketWebsite = new aws.s3.BucketWebsiteConfiguration("old-website-bucket-website", {
    bucket: oldBucket.id,
    indexDocument: {
        suffix: "index.html"
    },
    errorDocument: {
        key: "404.html"
    }
});

const oldBucketPublicAccessBlock = new aws.s3.BucketPublicAccessBlock("old-bucket-public-access-block", {
    bucket: oldBucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false
});

const oldBucketPolicy = new aws.s3.BucketPolicy("old-bucket-policy", {
    bucket: oldBucket.id,
    policy: oldBucket.arn.apply(arn => JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `${arn}/*`
        }]
    }))
}, { dependsOn: [oldBucketPublicAccessBlock] });

// CloudFront distribution for old site
const oldDistribution = new aws.cloudfront.Distribution("old-website-cdn", {
    enabled: true,
    isIpv6Enabled: true,
    defaultRootObject: "index.html",
    aliases: [oldBucketName],
    
    origins: [{
        originId: `S3-${oldBucketName}`,
        domainName: oldBucketWebsite.websiteEndpoint,
        customOriginConfig: {
            httpPort: 80,
            httpsPort: 443,
            originProtocolPolicy: "http-only",
            originSslProtocols: ["TLSv1.2"]
        }
    }],
    
    defaultCacheBehavior: {
        targetOriginId: `S3-${oldBucketName}`,
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD", "OPTIONS"],
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
    
    viewerCertificate: {
        acmCertificateArn: certificate.arn,
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1.2_2021"
    },
    
    restrictions: {
        geoRestriction: {
            restrictionType: "none"
        }
    }
});

// DNS record for old subdomain pointing to dedicated distribution
const oldRecord = new aws.route53.Record("website-old-dns", {
    zoneId: hostedZone.then(zone => zone.zoneId),
    name: `old.${domainName}`,
    type: "A",
    aliases: [{
        name: oldDistribution.domainName,
        zoneId: oldDistribution.hostedZoneId,
        evaluateTargetHealth: false
    }]
});

// CloudWatch Dashboard for analytics
const dashboard = new aws.cloudwatch.Dashboard("analytics-dashboard", {
    dashboardName: `${domainName.replace(/\./g, "-")}-analytics`,
    dashboardBody: pulumi.all([distribution.id, oldDistribution.id]).apply(([mainDistId, oldDistId]) => JSON.stringify({
        widgets: [
            // Main site traffic
            {
                type: "metric",
                properties: {
                    metrics: [
                        ["AWS/CloudFront", "Requests", { stat: "Sum", label: "Total Requests" }],
                    ],
                    period: 300,
                    stat: "Sum",
                    region: "us-east-1",
                    title: "Main Site - Requests",
                    yAxis: { left: { min: 0 } },
                    dimensions: { DistributionId: mainDistId }
                }
            },
            // Bandwidth
            {
                type: "metric",
                properties: {
                    metrics: [
                        ["AWS/CloudFront", "BytesDownloaded", { stat: "Sum", label: "Bytes Downloaded" }],
                    ],
                    period: 300,
                    stat: "Sum",
                    region: "us-east-1",
                    title: "Main Site - Bandwidth",
                    yAxis: { left: { min: 0 } }
                }
            },
            // Error rate
            {
                type: "metric",
                properties: {
                    metrics: [
                        ["AWS/CloudFront", "4xxErrorRate", { stat: "Average", label: "4xx Errors" }],
                        [".", "5xxErrorRate", { stat: "Average", label: "5xx Errors" }]
                    ],
                    period: 300,
                    stat: "Average",
                    region: "us-east-1",
                    title: "Error Rates",
                    yAxis: { left: { min: 0, max: 100 } }
                }
            }
        ]
    }))
});

// Export important values
export const bucketName = bucket.id;
export const bucketWebsiteEndpoint = bucketWebsite.websiteEndpoint;
export const distributionId = distribution.id;
export const distributionDomainName = distribution.domainName;
export const certificateArn = certificateValidation.certificateArn;
export const websiteUrl = `https://${domainName}`;

// Old site exports
export const oldBucketId = oldBucket.id;
export const oldDistributionId = oldDistribution.id;
export const oldWebsiteUrl = `https://old.${domainName}`;

// Analytics exports
export const analyticsBucketName = loggingBucket.id;
export const analyticsLogsPath = loggingBucket.id.apply(bucketId => `s3://${bucketId}/cloudfront-logs/`);
export const dashboardUrl = dashboard.dashboardName.apply(name =>
    `https://console.aws.amazon.com/cloudwatch/home?region=eu-north-1#dashboards:name=${name}`);

// ==============================================================================
// Metrics Collection Lambda
// ==============================================================================

// IAM role for Lambda
const metricsLambdaRole = new aws.iam.Role("metrics-lambda-role", {
    assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Action: "sts:AssumeRole",
            Principal: {
                Service: "lambda.amazonaws.com"
            },
            Effect: "Allow"
        }]
    })
});

// Attach CloudWatch read permissions
const metricsLambdaCloudWatchPolicy = new aws.iam.RolePolicy("metrics-lambda-cloudwatch-policy", {
    role: metricsLambdaRole.id,
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow",
            Action: [
                "cloudwatch:GetMetricStatistics",
                "cloudwatch:ListMetrics"
            ],
            Resource: "*"
        }]
    })
});

// Note: S3 write permissions removed - metrics.json collection disabled

// Attach basic Lambda execution role
const metricsLambdaBasicPolicy = new aws.iam.RolePolicyAttachment("metrics-lambda-basic-policy", {
    role: metricsLambdaRole.id,
    policyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
});

// Lambda function
const metricsLambda = new aws.lambda.Function("metrics-collector", {
    code: new pulumi.asset.AssetArchive({
        ".": new pulumi.asset.FileArchive("../metrics/lambda")
    }),
    runtime: "nodejs22.x",
    role: metricsLambdaRole.arn,
    handler: "metrics-collector.handler",
    timeout: 60,
    environment: {
        variables: {
            DISTRIBUTION_ID: distribution.id
            // AWS_REGION is automatically set by Lambda based on deployment region
            // Note: BUCKET_NAME removed - S3 upload disabled
        }
    }
}, { dependsOn: [metricsLambdaCloudWatchPolicy, metricsLambdaBasicPolicy] });

// EventBridge rule to trigger Lambda daily at midnight UTC
const metricsScheduleRule = new aws.cloudwatch.EventRule("metrics-daily-schedule", {
    description: "Trigger metrics collection daily at midnight UTC",
    scheduleExpression: "cron(0 0 * * ? *)" // Every day at midnight UTC
});

// Permission for EventBridge to invoke Lambda
const metricsLambdaPermission = new aws.lambda.Permission("metrics-lambda-permission", {
    action: "lambda:InvokeFunction",
    function: metricsLambda.name,
    principal: "events.amazonaws.com",
    sourceArn: metricsScheduleRule.arn
});

// EventBridge target
const metricsScheduleTarget = new aws.cloudwatch.EventTarget("metrics-schedule-target", {
    rule: metricsScheduleRule.name,
    arn: metricsLambda.arn
});

// NOTE: GitHubActionsLambdaDeployment IAM policy was created manually via AWS CLI
// Policy ARN: arn:aws:iam::226295163401:policy/GitHubActionsLambdaDeployment
// Attached to: github-actions-s3-website role
// This grants GitHub Actions permissions to deploy Lambda functions, IAM roles, and EventBridge rules
// Policy document is stored in: pulumi/github-actions-lambda-policy.json

// Metrics Lambda exports
export const metricsLambdaArn = metricsLambda.arn;
export const metricsLambdaName = metricsLambda.name;