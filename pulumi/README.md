# Infrastructure as Code with Pulumi

This directory contains the infrastructure definition for Zero to One Solutions website using Pulumi with TypeScript.

## Overview

This Pulumi project creates:
- S3 bucket for static website hosting
- CloudFront distribution for global CDN
- ACM certificate for HTTPS (automatically validated via DNS)
- Route53 records for domain and www subdomain

## Prerequisites

1. **Pulumi CLI**: Install from [pulumi.com](https://www.pulumi.com/docs/get-started/install/)
2. **Node.js**: Version 20+ (for TypeScript compilation)
3. **AWS CLI**: Configured with appropriate permissions
4. **Pulumi Access Token**: For state management (stored in GitHub secrets as `PULUMI_ACCESS_TOKEN`)

## Local Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Preview changes
npm run preview

# Deploy changes
npm run up

# Destroy infrastructure (careful!)
npm run destroy
```

## Configuration

The project uses these configuration values:

- `aws:region`: AWS region (default: us-east-1)
- `zerotoone-solutions:domainName`: Primary domain name
- `zerotoone-solutions:additionalDomains`: Additional domains (optional)

For production, these are set in `Pulumi.production.yaml`.

## GitHub Actions Deployment

The deployment happens automatically on pushes to main branch via `.github/workflows/deploy-pulumi.yml`.

Required GitHub secrets:
- `AWS_ROLE`: AWS IAM role ARN for OIDC authentication
- `AWS_REGION`: AWS region
- `DOMAIN_NAME`: Primary domain name
- `PULUMI_ACCESS_TOKEN`: Pulumi access token for state management

## Advantages over Terraform

- **Type Safety**: Full TypeScript support with IDE autocomplete
- **No Import Logic**: Pulumi handles existing resources gracefully
- **Clean Code**: No shell scripting in CI/CD pipeline
- **Better Error Messages**: More descriptive errors and debugging
- **Native AWS SDK**: Direct access to AWS APIs when needed

## Stack Management

- **Production Stack**: `production` (used by GitHub Actions)
- **Local Development**: Create your own stack with `pulumi stack init <name>`

## Troubleshooting

If you encounter issues:

1. Check AWS permissions for your role/user
2. Verify domain is properly configured in Route53
3. Ensure Pulumi access token is valid
4. Check stack configuration with `pulumi config`

For existing resources, Pulumi will detect and manage them automatically without complex import procedures.