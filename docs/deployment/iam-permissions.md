# IAM Permissions for GitHub Actions Deployment

## Required Permissions

The `github-actions-s3-website` IAM role needs the following permissions to deploy the infrastructure:

### S3 Bucket Management

Add this policy to the `github-actions-s3-website` IAM role:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3BucketManagement",
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket",
                "s3:DeleteBucket",
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:GetBucketPolicy",
                "s3:PutBucketPolicy",
                "s3:DeleteBucketPolicy",
                "s3:GetBucketAcl",
                "s3:PutBucketAcl",
                "s3:GetBucketWebsite",
                "s3:PutBucketWebsite",
                "s3:GetBucketPublicAccessBlock",
                "s3:PutBucketPublicAccessBlock",
                "s3:GetLifecycleConfiguration",
                "s3:PutLifecycleConfiguration",
                "s3:DeleteBucketLifecycle"
            ],
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Sid": "S3ObjectManagement",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListMultipartUploadParts",
                "s3:AbortMultipartUpload"
            ],
            "Resource": "arn:aws:s3:::*/*"
        }
    ]
}
```

## How to Add Permissions

### Via AWS Console

1. Go to IAM → Roles
2. Find the `github-actions-s3-website` role
3. Click "Add permissions" → "Create inline policy"
4. Use the JSON editor and paste the policy above
5. Name it `S3BucketManagement`
6. Click "Create policy"

### Via AWS CLI

```bash
aws iam put-role-policy \
  --role-name github-actions-s3-website \
  --policy-name S3BucketManagement \
  --policy-document file://iam-policy.json
```

## Why These Permissions Are Needed

These permissions allow GitHub Actions to:

1. **Create analytics logging bucket**: `s3:CreateBucket` for the CloudFront access logs
2. **Configure lifecycle rules**: `s3:PutLifecycleConfiguration` to auto-delete old logs after 90 days
3. **Set up ACLs**: `s3:PutBucketAcl` to allow CloudFront to write logs
4. **Manage existing buckets**: Standard CRUD operations for the website buckets
5. **Sync files**: `s3:PutObject` and `s3:DeleteObject` for deploying site content

## Security Notes

- These permissions are scoped to S3 only
- No IAM permissions are granted (principle of least privilege)
- CloudFront and Route53 resources are managed by Pulumi but don't require creation permissions
- The analytics bucket uses lifecycle rules to keep costs under €0.10/month
