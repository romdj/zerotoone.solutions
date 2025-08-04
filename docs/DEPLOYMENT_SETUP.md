# Deployment Setup Guide

This guide covers the setup required for automated deployment using Pulumi and GitHub Actions.

## Required GitHub Secrets

The following secrets need to be configured in your GitHub repository:

### AWS Configuration
- **`AWS_ROLE`** - AWS IAM Role ARN for OIDC authentication
- **`AWS_REGION`** - AWS region (e.g., `us-east-1`)

### Domain Configuration  
- **`DOMAIN_NAME`** - Your primary domain name (e.g., `example.com`)

## Authentication Method

The deployment uses **AWS OIDC** (OpenID Connect) for secure, keyless authentication. This eliminates the need for:
- AWS access keys
- AWS secret keys  
- Pulumi access tokens

## AWS Setup Requirements

1. **OIDC Identity Provider**: Configure GitHub Actions OIDC in your AWS account
2. **IAM Role**: Create a role with necessary permissions for:
   - S3 bucket management
   - CloudFront distribution management
   - ACM certificate management
   - Route53 DNS record management
3. **Route53 Hosted Zone**: Ensure your domain has a hosted zone configured

## Local Development

For local development and validation:

```bash
# Validate Pulumi infrastructure
npm run pulumi:validate

# This runs TypeScript compilation checks
```

## Deployment Process

The deployment automatically:
1. Builds and tests the application
2. Deploys AWS infrastructure using Pulumi
3. Syncs static files to S3
4. Invalidates CloudFront cache

## Security Notes

- All authentication uses OIDC - no long-lived credentials
- Infrastructure state is managed locally during CI/CD runs
- Minimal required permissions following least-privilege principle

## Troubleshooting

Common issues and solutions:
- **Permission errors**: Verify OIDC role configuration and permissions
- **Domain errors**: Ensure Route53 hosted zone exists and is properly configured
- **Build failures**: Check pre-commit validation passes locally first