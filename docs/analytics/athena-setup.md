# CloudFront Analytics with Athena

**Cost:** ~€0.05-0.10/month (query costs only)

**Last Updated:** 2025-12-27

---

## Overview

CloudFront access logs are automatically written to S3 every 15 minutes. We use AWS Athena (serverless SQL) to query these logs for analytics insights.

**Architecture:**
```
Visitor → CloudFront → S3 Website
              ↓
        Access Logs → S3 Analytics Bucket → Athena Queries
```

---

## Infrastructure (Already Deployed via Pulumi)

✅ **S3 Analytics Bucket:** `analytics-{domainName}`
✅ **CloudFront Logging:** Enabled, prefix `cloudfront-logs/`
✅ **Lifecycle Policy:** Logs deleted after 90 days (cost optimization)
✅ **Permissions:** CloudFront can write logs

---

## Step 1: Create Athena Database

**Only do this ONCE:**

```sql
CREATE DATABASE IF NOT EXISTS website_analytics;
```

---

## Step 2: Create Athena Table for CloudFront Logs

**Run this in AWS Athena Console:**

Replace `{ANALYTICS_BUCKET_NAME}` with your actual bucket name (check `pulumi stack output analyticsBucketName`).

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS website_analytics.cloudfront_logs (
  `date` DATE,
  time STRING,
  location STRING,
  bytes BIGINT,
  request_ip STRING,
  method STRING,
  host STRING,
  uri STRING,
  status INT,
  referrer STRING,
  user_agent STRING,
  query_string STRING,
  cookie STRING,
  result_type STRING,
  request_id STRING,
  host_header STRING,
  request_protocol STRING,
  request_bytes BIGINT,
  time_taken FLOAT,
  xforwarded_for STRING,
  ssl_protocol STRING,
  ssl_cipher STRING,
  response_result_type STRING,
  http_version STRING,
  fle_status STRING,
  fle_encrypted_fields INT,
  c_port INT,
  time_to_first_byte FLOAT,
  x_edge_detailed_result_type STRING,
  sc_content_type STRING,
  sc_content_len BIGINT,
  sc_range_start BIGINT,
  sc_range_end BIGINT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY '\t'
LOCATION 's3://{ANALYTICS_BUCKET_NAME}/cloudfront-logs/'
TBLPROPERTIES ('skip.header.line.count'='2');
```

**Example:**
```sql
-- If your bucket is: analytics-zerotoone.solutions
LOCATION 's3://analytics-zerotoone.solutions/cloudfront-logs/'
```

---

## Step 3: Wait for First Logs

CloudFront logs are delivered **every 15-30 minutes**. After deploying with Pulumi, wait ~30 minutes for first logs to appear.

**Check logs exist:**
```bash
# AWS CLI
aws s3 ls s3://analytics-{domainName}/cloudfront-logs/ --recursive

# Should see files like:
# cloudfront-logs/E1234567890ABC.2025-12-27-15.abcd1234.gz
```

---

## Common Analytics Queries

### 1. Daily Page Views & Unique Visitors (Last 30 Days)

```sql
SELECT
    date,
    COUNT(*) as page_views,
    COUNT(DISTINCT request_ip) as unique_visitors
FROM website_analytics.cloudfront_logs
WHERE date >= current_date - interval '30' day
  AND status = 200
  AND uri NOT LIKE '%.css'
  AND uri NOT LIKE '%.js'
  AND uri NOT LIKE '%.png'
  AND uri NOT LIKE '%.jpg'
  AND uri NOT LIKE '%.svg'
  AND uri NOT LIKE '%.ico'
GROUP BY date
ORDER BY date DESC;
```

**Cost:** ~€0.01 per run

---

### 2. Top 10 Pages (This Month)

```sql
SELECT
    uri as page,
    COUNT(*) as page_views,
    COUNT(DISTINCT request_ip) as unique_visitors
FROM website_analytics.cloudfront_logs
WHERE date >= date_trunc('month', current_date)
  AND status = 200
  AND uri NOT LIKE '%.css'
  AND uri NOT LIKE '%.js'
  AND uri NOT LIKE '%.png'
  AND uri NOT LIKE '%.jpg'
  AND uri NOT LIKE '%.svg'
  AND uri NOT LIKE '%.ico'
GROUP BY uri
ORDER BY page_views DESC
LIMIT 10;
```

---

### 3. Traffic Sources (Referrers)

```sql
SELECT
    CASE
        WHEN referrer = '-' THEN 'Direct'
        WHEN referrer LIKE '%google.%' THEN 'Google'
        WHEN referrer LIKE '%linkedin.%' THEN 'LinkedIn'
        WHEN referrer LIKE '%github.%' THEN 'GitHub'
        WHEN referrer LIKE '%twitter.%' OR referrer LIKE '%x.com%' THEN 'Twitter/X'
        ELSE referrer
    END as source,
    COUNT(*) as visits,
    COUNT(DISTINCT request_ip) as unique_visitors
FROM website_analytics.cloudfront_logs
WHERE date >= current_date - interval '30' day
  AND status = 200
GROUP BY
    CASE
        WHEN referrer = '-' THEN 'Direct'
        WHEN referrer LIKE '%google.%' THEN 'Google'
        WHEN referrer LIKE '%linkedin.%' THEN 'LinkedIn'
        WHEN referrer LIKE '%github.%' THEN 'GitHub'
        WHEN referrer LIKE '%twitter.%' OR referrer LIKE '%x.com%' THEN 'Twitter/X'
        ELSE referrer
    END
ORDER BY visits DESC
LIMIT 10;
```

---

### 4. Geographic Distribution (Top Countries)

```sql
SELECT
    location as country_code,
    COUNT(*) as requests,
    COUNT(DISTINCT request_ip) as unique_visitors
FROM website_analytics.cloudfront_logs
WHERE date >= current_date - interval '30' day
  AND status = 200
GROUP BY location
ORDER BY requests DESC
LIMIT 10;
```

---

### 5. Device & Browser Detection (User Agents)

```sql
SELECT
    CASE
        WHEN user_agent LIKE '%Mobile%' OR user_agent LIKE '%Android%' THEN 'Mobile'
        WHEN user_agent LIKE '%iPad%' OR user_agent LIKE '%Tablet%' THEN 'Tablet'
        ELSE 'Desktop'
    END as device_type,
    CASE
        WHEN user_agent LIKE '%Chrome%' AND user_agent NOT LIKE '%Edg%' THEN 'Chrome'
        WHEN user_agent LIKE '%Safari%' AND user_agent NOT LIKE '%Chrome%' THEN 'Safari'
        WHEN user_agent LIKE '%Firefox%' THEN 'Firefox'
        WHEN user_agent LIKE '%Edg%' THEN 'Edge'
        ELSE 'Other'
    END as browser,
    COUNT(*) as visits
FROM website_analytics.cloudfront_logs
WHERE date >= current_date - interval '30' day
  AND status = 200
GROUP BY
    CASE
        WHEN user_agent LIKE '%Mobile%' OR user_agent LIKE '%Android%' THEN 'Mobile'
        WHEN user_agent LIKE '%iPad%' OR user_agent LIKE '%Tablet%' THEN 'Tablet'
        ELSE 'Desktop'
    END,
    CASE
        WHEN user_agent LIKE '%Chrome%' AND user_agent NOT LIKE '%Edg%' THEN 'Chrome'
        WHEN user_agent LIKE '%Safari%' AND user_agent NOT LIKE '%Chrome%' THEN 'Safari'
        WHEN user_agent LIKE '%Firefox%' THEN 'Firefox'
        WHEN user_agent LIKE '%Edg%' THEN 'Edge'
        ELSE 'Other'
    END
ORDER BY visits DESC;
```

---

### 6. Performance Metrics (Response Times)

```sql
SELECT
    date,
    AVG(time_taken) as avg_response_time_sec,
    APPROX_PERCENTILE(time_taken, 0.95) as p95_response_time_sec,
    MAX(time_taken) as max_response_time_sec
FROM website_analytics.cloudfront_logs
WHERE date >= current_date - interval '7' day
  AND status = 200
GROUP BY date
ORDER BY date DESC;
```

---

### 7. 404 Errors (Broken Links)

```sql
SELECT
    uri as broken_page,
    referrer,
    COUNT(*) as error_count
FROM website_analytics.cloudfront_logs
WHERE date >= current_date - interval '7' day
  AND status = 404
GROUP BY uri, referrer
ORDER BY error_count DESC
LIMIT 20;
```

---

### 8. Hourly Traffic Pattern (Last 7 Days)

```sql
SELECT
    CAST(substr(time, 1, 2) AS INT) as hour_of_day,
    COUNT(*) as requests,
    COUNT(DISTINCT request_ip) as unique_visitors
FROM website_analytics.cloudfront_logs
WHERE date >= current_date - interval '7' day
  AND status = 200
GROUP BY CAST(substr(time, 1, 2) AS INT)
ORDER BY hour_of_day;
```

---

## Cost Optimization Tips

### 1. **Partition Your Data** (Future Enhancement)
Once you have more data, partition by year/month to reduce scan costs:

```sql
-- Partitioned table (more efficient for large datasets)
CREATE EXTERNAL TABLE website_analytics.cloudfront_logs_partitioned (
  -- same columns as above
)
PARTITIONED BY (year INT, month INT)
LOCATION 's3://{ANALYTICS_BUCKET_NAME}/cloudfront-logs-partitioned/';
```

### 2. **Only Query What You Need**
```sql
-- ❌ Expensive (scans all columns)
SELECT * FROM cloudfront_logs;

-- ✅ Cheap (scans only needed columns)
SELECT date, uri, request_ip FROM cloudfront_logs;
```

### 3. **Use Date Filters**
```sql
-- ❌ Expensive (scans all data)
SELECT COUNT(*) FROM cloudfront_logs;

-- ✅ Cheap (scans only last 30 days)
SELECT COUNT(*) FROM cloudfront_logs
WHERE date >= current_date - interval '30' day;
```

### 4. **Query Less Frequently**
- Run queries **weekly** instead of daily
- Save query results to reuse
- Use Athena saved queries

---

## Monthly Analytics Routine

**Recommended Schedule:**

### Weekly (Every Monday)
```sql
-- Quick health check (< €0.01)
SELECT
    date,
    COUNT(*) as page_views,
    COUNT(DISTINCT request_ip) as unique_visitors
FROM website_analytics.cloudfront_logs
WHERE date >= current_date - interval '7' day
GROUP BY date
ORDER BY date DESC;
```

### Monthly (1st of Month)
Run all 8 queries above for full monthly report (~€0.05-0.08 total)

---

## Troubleshooting

### No Logs Appearing?

**1. Check CloudFront logging is enabled:**
```bash
pulumi stack output distributionId
```

**2. Verify S3 bucket has logs:**
```bash
aws s3 ls s3://analytics-{domainName}/cloudfront-logs/ --recursive
```

**3. Wait 30 minutes** - CloudFront logs are delayed

### Athena Query Fails?

**Error: "HIVE_CURSOR_ERROR"**
- Check bucket name in `LOCATION` matches exactly
- Ensure table was created successfully

**Error: "Insufficient permissions"**
- Your AWS user needs `AmazonAthenaFullAccess` and `AmazonS3ReadOnlyAccess`

### Query Returns No Results?

**Check date range:**
```sql
-- See what dates have logs
SELECT DISTINCT date
FROM website_analytics.cloudfront_logs
ORDER BY date DESC;
```

---

## Next Steps

### Want a Dashboard?

**Option 1: AWS QuickSight** (~€9/month)
- Visual dashboards
- Scheduled reports
- Not recommended for < €1/month budget

**Option 2: Export to Google Sheets**
- Run query in Athena
- Download CSV
- Import to Google Sheets
- Create charts manually

**Option 3: Add GoatCounter** (Free)
- Real-time dashboard
- Complements Athena (historical data)
- See `docs/analytics/goatcounter-setup.md`

---

## Summary

✅ **Setup:** One-time Athena table creation
✅ **Cost:** ~€0.05-0.10/month (query costs only)
✅ **Frequency:** Weekly quick check, monthly deep dive
✅ **Queries:** 8 pre-built queries for all common metrics
✅ **Retention:** 90 days (configurable in Pulumi)
✅ **Privacy:** 100% your data, GDPR compliant

**You now have full analytics without any monthly fees!**

---

**Last Updated:** 2025-12-27
