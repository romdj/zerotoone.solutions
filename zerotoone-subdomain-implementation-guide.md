# Zero to One Solutions - Subdomain Implementation Guide

This guide explains how to create a new subdomain site (e.g., `blog.zerotoone.solutions`) in a separate repository while integrating with the existing infrastructure.

## Architecture Overview

The recommended approach uses **separate infrastructure** for each subdomain while sharing key resources:

- ✅ **Independent deployments** and repository isolation
- ✅ **Shared SSL certificate** and DNS zone
- ✅ **Own CloudFront distribution** and S3 bucket
- ✅ **Team autonomy** with centralized domain management

## Prerequisites

- Access to the main `zerotoone.solutions` repository
- AWS credentials with appropriate permissions
- Pulumi access token
- New repository for your subdomain project

## Step 1: Update Main Repository Certificate

First, add your new subdomain to the existing SSL certificate in the main repository.

### Edit `pulumi/index.ts`

```typescript
// ACM Certificate for HTTPS
const certificate = new aws.acm.Certificate("website-cert", {
    domainName: domainName,
    subjectAlternativeNames: [
        `www.${domainName}`,
        `old.${domainName}`,
        `blog.${domainName}`,        // Add your subdomain here
        `docs.${domainName}`,        // Add more as needed
        ...allDomains.filter(d => d !== domainName && d !== `www.${domainName}`)
    ],
    validationMethod: "DNS"
}, { provider: usEast1Provider });
```

### Commit and Deploy

```bash
git add pulumi/index.ts
git commit -m "Add new subdomain to SSL certificate SANs"
git push origin main
```

Wait for the GitHub workflow to complete the certificate update.

## Step 2: Get Certificate ARN

After the main repository deployment completes, get the certificate ARN:

```bash
cd main-repo/pulumi
pulumi stack output certificateArn
# Output: arn:aws:acm:us-east-1:226295163401:certificate/YOUR-CERT-ID
```

## Step 3: Create New Repository Structure

### Project Structure

```
your-subdomain-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── pulumi/
│   ├── package.json
│   ├── index.ts
│   ├── Pulumi.yaml
│   └── Pulumi.production.yaml
├── src/                    # Your application source
├── build/                  # Build output directory
├── package.json
└── README.md
```

### Pulumi Configuration

**`pulumi/package.json`**:
```json
{
  "name": "subdomain-infrastructure",
  "version": "1.0.0",
  "main": "index.ts",
  "dependencies": {
    "@pulumi/pulumi": "^3.189.0",
    "@pulumi/aws": "^7.3.1"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

**`pulumi/Pulumi.yaml`**:
```yaml
name: your-subdomain-project
runtime: nodejs
description: Subdomain site for zerotoone.solutions
```

**`pulumi/Pulumi.production.yaml`**:
```yaml
config:
  your-subdomain-project:subdomain: blog  # Change to your subdomain
  your-subdomain-project:parentDomain: zerotoone.solutions
  your-subdomain-project:certificateArn: arn:aws:acm:us-east-1:226295163401:certificate/YOUR-CERT-ID
```

### Infrastructure Code

**`pulumi/index.ts`**:
```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const config = new pulumi.Config();
const subdomain = config.require("subdomain"); // e.g., "blog"
const parentDomain = config.require("parentDomain"); // "zerotoone.solutions"
const fullDomain = `${subdomain}.${parentDomain}`;

// Reference existing Route53 zone (don't create new)
const hostedZone = aws.route53.getZone({
    name: parentDomain,
    privateZone: false
});

// Reference existing certificate ARN from main project
const certificateArn = config.require("certificateArn");

// Your own S3 bucket
const bucket = new aws.s3.Bucket(`${subdomain}-website-bucket`, {
    bucket: fullDomain,
    forceDestroy: true
});

// S3 website configuration
const bucketWebsite = new aws.s3.BucketWebsiteConfiguration(`${subdomain}-website-config`, {
    bucket: bucket.id,
    indexDocument: { suffix: "index.html" },
    errorDocument: { key: "404.html" }
});

// Public access configuration
const bucketPublicAccessBlock = new aws.s3.BucketPublicAccessBlock(`${subdomain}-public-access`, {
    bucket: bucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false
});

// Bucket policy
const bucketPolicy = new aws.s3.BucketPolicy(`${subdomain}-bucket-policy`, {
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

// Your own CloudFront distribution
const distribution = new aws.cloudfront.Distribution(`${subdomain}-cdn`, {
    enabled: true,
    isIpv6Enabled: true,
    defaultRootObject: "index.html",
    aliases: [fullDomain],
    
    origins: [{
        originId: `S3-${fullDomain}`,
        domainName: bucketWebsite.websiteEndpoint,
        customOriginConfig: {
            httpPort: 80,
            httpsPort: 443,
            originProtocolPolicy: "http-only",
            originSslProtocols: ["TLSv1.2"]
        }
    }],
    
    defaultCacheBehavior: {
        targetOriginId: `S3-${fullDomain}`,
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
    
    // Cache optimization for static assets
    orderedCacheBehaviors: [
        {
            pathPattern: "/_app/immutable/*",
            targetOriginId: `S3-${fullDomain}`,
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
    
    viewerCertificate: {
        acmCertificateArn: certificateArn,
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1.2_2021"
    },
    
    restrictions: {
        geoRestriction: { restrictionType: "none" }
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
            responsePagePath: "/index.html" // For SPA routing
        }
    ]
});

// DNS record
const dnsRecord = new aws.route53.Record(`${subdomain}-dns`, {
    zoneId: hostedZone.then(zone => zone.zoneId),
    name: fullDomain,
    type: "A",
    aliases: [{
        name: distribution.domainName,
        zoneId: distribution.hostedZoneId,
        evaluateTargetHealth: false
    }]
});

export const bucketName = bucket.id;
export const distributionId = distribution.id;
export const distributionDomainName = distribution.domainName;
export const websiteUrl = `https://${fullDomain}`;
```

## Step 4: GitHub Workflow

**`.github/workflows/deploy.yml`**:
```yaml
name: Deploy Subdomain Site

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '24'
  PULUMI_VERSION: '3.189.0'

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Run tests
        run: npm test 2>/dev/null || echo "No tests configured"

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-files
          path: build/
          retention-days: 1

  deploy:
    runs-on: ubuntu-latest
    needs: build-and-test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-files
          path: build/

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: pulumi/package-lock.json

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Setup Pulumi
        uses: pulumi/actions@v6

      - name: Install Pulumi dependencies
        working-directory: ./pulumi
        run: npm ci

      - name: Deploy infrastructure
        working-directory: ./pulumi
        run: |
          pulumi stack select romdj/your-subdomain-project/production --create
          pulumi config set aws:region ${{ secrets.AWS_REGION }}
          pulumi up --yes
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}

      - name: Deploy to S3
        run: |
          BUCKET_NAME=$(cd pulumi && pulumi stack output bucketName)
          aws s3 sync build/ s3://$BUCKET_NAME/ --delete --exact-timestamps

      - name: Invalidate CloudFront
        working-directory: ./pulumi
        run: |
          DISTRIBUTION_ID=$(pulumi stack output distributionId)
          aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

## Step 5: GitHub Secrets

Configure these secrets in your new repository (copy from main repo):

### Required Secrets
- `AWS_ROLE`: ARN of the AWS role for authentication
- `AWS_REGION`: AWS region (e.g., `eu-central-1`)
- `PULUMI_ACCESS_TOKEN`: Your Pulumi access token

### Environment Setup
Create a `production` environment in GitHub repository settings for deployment protection.

## Step 6: Initialize and Deploy

### Initialize Pulumi Stack

```bash
cd your-subdomain-repo/pulumi
npm install
pulumi login
pulumi stack init romdj/your-subdomain-project/production
```

### Set Configuration

```bash
pulumi config set subdomain blog  # Your subdomain
pulumi config set parentDomain zerotoone.solutions
pulumi config set certificateArn arn:aws:acm:us-east-1:226295163401:certificate/YOUR-CERT-ID
pulumi config set aws:region eu-central-1
```

### Deploy

```bash
git add .
git commit -m "Initial subdomain infrastructure setup"
git push origin main
```

## Subdomain Examples

### Blog Site (`blog.zerotoone.solutions`)
- Content management system
- Articles and insights
- Independent from main site

### Documentation (`docs.zerotoone.solutions`)
- API documentation
- Technical guides
- Developer resources

### Portfolio (`work.zerotoone.solutions`)
- Detailed case studies
- Project showcases
- Client testimonials

## Maintenance

### Adding More Subdomains
1. Update certificate SANs in main repo
2. Create new repository using this template
3. Update configuration with new subdomain name

### SSL Certificate Updates
The certificate is managed in the main repository. All subdomains automatically get SSL when added to the certificate SANs.

### DNS Management
DNS records are created automatically by each subdomain's Pulumi stack, but they all reference the same Route53 hosted zone.

## Troubleshooting

### Common Issues

**Certificate Not Found**
- Ensure the subdomain is added to main repo certificate
- Verify certificate ARN is correct in configuration

**DNS Resolution Issues**
- Check Route53 hosted zone permissions
- Verify DNS record creation in AWS console

**CloudFront Access Denied**
- Confirm S3 bucket policy allows public access
- Check CloudFront distribution configuration

### Getting Help

For infrastructure issues related to the main domain, consult the main repository's documentation and deployment logs.

---

## Implementation Checklist

- [ ] Add subdomain to main repo SSL certificate
- [ ] Get certificate ARN from main repo
- [ ] Create new repository structure
- [ ] Configure Pulumi files
- [ ] Set up GitHub workflow
- [ ] Configure repository secrets
- [ ] Initialize Pulumi stack
- [ ] Deploy and test

Once completed, your subdomain will be live at `https://yoursubdomain.zerotoone.solutions` with independent deployment pipeline and shared SSL/DNS infrastructure.