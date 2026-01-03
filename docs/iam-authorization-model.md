# IAM Authorization Model

## Overview

This document defines the IAM permissions structure for the Zero to One Solutions infrastructure.

## Actors and Roles

### 1. GitHub Actions Deployment Role
**Role Name**: `github-actions-s3-website`
**Purpose**: CI/CD pipeline deployments from GitHub Actions
**Authentication**: OIDC federation

**Required Permissions**:

#### Core Infrastructure (Current)
- ✅ S3: Full access to website buckets
- ✅ CloudFront: Distribution management and invalidation
- ✅ Route53: DNS record management
- ✅ ACM: Certificate management and validation
- ✅ CloudWatch: Dashboard creation and management

#### Lambda Infrastructure (Missing - Added in this PR)
- ❌ Lambda: Function creation, updates, permissions
- ❌ IAM: Role/policy creation for Lambda execution
- ❌ EventBridge: Schedule rule creation and targets

**Recommendation**:
- Attach the `GitHubActionsLambdaDeployment` policy created in `pulumi/index.ts`
- This policy grants minimum necessary permissions for Lambda deployment
- Scoped to infrastructure deployment only (not runtime execution)

---

### 2. Local Development User
**User Name**: `romdj-dev`
**Purpose**: Local Pulumi deployments and testing
**Authentication**: IAM user with access keys

**Current Permissions**: Unknown (need to audit)

**Required Permissions**:
- All GitHub Actions permissions (superset)
- Route53: `ListHostedZones`, `GetHostedZone` (currently missing)
- Pulumi state management (S3 backend if used locally)

**Recommendation**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:ListHostedZones",
        "route53:GetHostedZone",
        "route53:ListResourceRecordSets",
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": "*"
    }
  ]
}
```

**Security Note**: For local development, consider using AWS SSO with temporary credentials instead of long-lived access keys.

---

### 3. Lambda Execution Roles

#### Metrics Collector Lambda
**Role Name**: `metrics-lambda-role`
**Purpose**: Runtime execution of metrics collection
**Permissions**: ✅ Properly scoped

**Current Permissions**:
- CloudWatch: `GetMetricStatistics`, `ListMetrics` (read-only)
- S3: `PutObject`, `PutObjectAcl` (write to specific bucket)
- CloudWatch Logs: Basic execution role (Lambda managed policy)

**Recommendation**: No changes needed - follows least privilege principle

---

## Permission Boundaries

### Principle of Least Privilege
Each role should have:
1. **Minimum permissions** required for its function
2. **No wildcards** where specific resources can be identified
3. **Time-limited credentials** where possible (OIDC, SSO)
4. **Regular audits** of unused permissions

### Deployment vs Runtime Separation
- **Deployment roles** (GitHub Actions, local dev): Manage infrastructure
- **Runtime roles** (Lambda execution): Execute application logic
- No overlap between these concerns

---

## Current State and Action Items

### Immediate Actions Required

1. **Deploy IAM Policy for GitHub Actions** (BLOCKING)
   - The `GitHubActionsLambdaDeployment` policy exists in code but isn't deployed
   - Need admin/elevated permissions to create this policy
   - Once created, Lambda deployment will work in CI/CD

2. **Fix Local Development User Route53 Access**
   - Add Route53 read permissions to `romdj-dev` user
   - Required for local Pulumi deployments

### Options to Resolve

#### Option A: Admin User One-Time Deployment (Recommended)
1. Use an AWS account with admin permissions
2. Deploy the IAM policy: `pulumi up`
3. Policy attaches to GitHub Actions role automatically
4. Future deployments work through GitHub Actions

#### Option B: Manual IAM Policy Creation
1. Log into AWS Console with admin account
2. Create the `GitHubActionsLambdaDeployment` policy manually
3. Attach to `github-actions-s3-website` role
4. Continue with automated deployment

#### Option C: AWS SSO for Local Development
1. Set up AWS SSO/Identity Center
2. Create permission set with required permissions
3. Use temporary credentials for local deployment
4. More secure than long-lived access keys

---

## Long-term Recommendations

1. **Migrate to AWS SSO**: Replace IAM user access keys with SSO temporary credentials
2. **Resource Tagging**: Tag all resources for better cost tracking and permission scoping
3. **Permission Auditing**: Use AWS Access Analyzer to identify unused permissions
4. **Separate Environments**: Consider separate AWS accounts for dev/staging/prod
5. **Policy Versioning**: Track IAM policy changes in git alongside infrastructure code

---

## Policy Documents Reference

### GitHubActionsLambdaDeployment Policy
Location: `pulumi/index.ts:502-569`

Grants permissions for:
- Lambda function lifecycle
- IAM role management for Lambda
- EventBridge schedule management

### Lambda Execution Policies
- **CloudWatch Policy**: `pulumi/index.ts:425-439`
- **S3 Policy**: `pulumi/index.ts:441-455`
- **Basic Execution**: AWS managed `AWSLambdaBasicExecutionRole`

---

## Security Considerations

### What We're Doing Right
- ✅ OIDC federation for GitHub Actions (no long-lived credentials)
- ✅ Least privilege for Lambda execution roles
- ✅ Infrastructure as code (auditable, version controlled)
- ✅ Separate roles for deployment vs execution

### Areas for Improvement
- ⚠️ Some policies use `Resource: "*"` (could be scoped tighter)
- ⚠️ Local dev using IAM user with access keys (migrate to SSO)
- ⚠️ No MFA requirement documented
- ⚠️ No CloudTrail monitoring mentioned

---

## Deployment Decision

**Recommended Path Forward**:

1. **Immediate**: Use admin credentials to run `pulumi up` once
   - Creates the `GitHubActionsLambdaDeployment` policy
   - Attaches policy to GitHub Actions role
   - Fixes Route53 permissions for local user (if needed)

2. **Short-term**: Add Route53 permissions to `romdj-dev` user via AWS Console

3. **Long-term**: Migrate to AWS SSO for all human access
