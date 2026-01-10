# Metrics Collector Lambda Function

AWS Lambda function that collects CloudWatch and CloudFront metrics.

**Note: S3 upload is currently disabled - metrics are only logged to CloudWatch for debugging purposes.**

## Overview

This Lambda function runs daily at midnight UTC (configurable via EventBridge) and:
1. Queries CloudWatch for CloudFront metrics (requests, bandwidth, errors)
2. Tracks its own invocation count (meta!)
3. Aggregates data over 30-day rolling windows
4. ~~Uploads `metrics.json` to the S3 website bucket~~ **DISABLED** - Logs metrics to CloudWatch instead

## Structure

```
metrics/lambda/
├── metrics-collector.js       # Main Lambda handler
├── metrics-collector.test.js  # Unit tests
├── package.json                # Dependencies and test scripts
└── README.md                   # This file
```

## Development

### Install Dependencies

```bash
cd metrics/lambda
npm install
```

### Run Tests

```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

### Test Coverage

The project maintains 80%+ coverage threshold for:
- Branches
- Functions
- Lines
- Statements

## Environment Variables

The Lambda function requires these environment variables (set by Pulumi):

- `DISTRIBUTION_ID` - CloudFront distribution ID to query metrics for
- ~~`BUCKET_NAME`~~ - **REMOVED** - S3 upload disabled
- `AWS_REGION` - AWS region (eu-north-1)
- `AWS_LAMBDA_FUNCTION_NAME` - Automatically set by Lambda runtime

## IAM Permissions Required

- `cloudwatch:GetMetricStatistics` - Read CloudWatch metrics
- `cloudwatch:ListMetrics` - List available metrics
- ~~`s3:PutObject`~~ - **REMOVED** - S3 upload disabled
- ~~`s3:PutObjectAcl`~~ - **REMOVED** - S3 upload disabled
- `logs:CreateLogGroup` - CloudWatch Logs (standard Lambda)
- `logs:CreateLogStream` - CloudWatch Logs (standard Lambda)
- `logs:PutLogEvents` - CloudWatch Logs (standard Lambda)

## Output Format

The function collects metrics (logged to CloudWatch) with this structure:

```json
{
  "lastUpdated": "2024-01-01T00:00:00.000Z",
  "requests": {
    "total": 15847,
    "last30Days": [
      { "date": "2024-01-01", "count": 523 }
    ]
  },
  "bandwidth": {
    "totalGB": 42.7,
    "last30Days": [
      { "date": "2024-01-01", "gb": "1.42" }
    ]
  },
  "uptime": {
    "percentage": 99.97,
    "avgResponseTime": 127
  },
  "errors": {
    "rate4xx": 0.3,
    "rate5xx": 0.01
  },
  "lambda": {
    "totalInvocations": 42,
    "last30Days": [
      { "date": "2024-01-01", "count": 1 }
    ]
  }
}
```

## Deployment

Deployed automatically via Pulumi infrastructure-as-code:

```bash
cd ../pulumi
pulumi up
```

## Manual Invocation

For testing purposes, invoke manually:

```bash
aws lambda invoke \
  --function-name metrics-collector \
  --region eu-north-1 \
  output.json
```

## Monitoring

- CloudWatch Logs: `/aws/lambda/metrics-collector`
- Execution duration: ~5-15 seconds typical
- Memory: 128MB sufficient
- Timeout: 60 seconds configured

## Cost Estimation

- Lambda invocations: 30/month (daily)
- Execution time: ~10s average
- Memory: 128MB
- **Estimated monthly cost: ~$0.20**

## Meta Feature

This Lambda function tracks its own invocation count in CloudWatch and includes it in the metrics output, creating a self-referential metrics loop displayed on the `/metrics` dashboard page.
