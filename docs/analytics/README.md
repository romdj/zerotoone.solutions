# Analytics Documentation

**Last Updated:** 2025-12-27

---

## Overview

This directory contains documentation for website analytics using **CloudFront Access Logs + AWS Athena**.

**Cost:** ~€0.05-0.10/month (well under the 1€/month requirement)

---

## Files

| File | Purpose |
|------|---------|
| [athena-setup.md](./athena-setup.md) | Complete setup guide, SQL queries, troubleshooting |

---

## Quick Start

### View Analytics Now

```bash
# Get CloudWatch Dashboard URL (real-time metrics)
cd pulumi && pulumi stack output dashboardUrl

# Or run the quick analytics script
./scripts/view-analytics.sh
```

### 1. Deploy Infrastructure (Pulumi)

```bash
cd pulumi/
pulumi up
```

This creates:
- ✅ S3 logging bucket (`analytics-{domainName}`)
- ✅ CloudFront logging enabled
- ✅ CloudWatch Dashboard (real-time metrics)
- ✅ 90-day log retention (cost optimization)

### 2. Wait for First Logs (~30 minutes)

CloudFront delivers logs every 15-30 minutes.

### 3. Create Athena Table (One-time setup)

Follow instructions in [athena-setup.md](./athena-setup.md#step-2-create-athena-table-for-cloudfront-logs)

### 4. Run Analytics Queries

Use the 8 pre-built queries in [athena-setup.md](./athena-setup.md#common-analytics-queries):
1. Daily page views & unique visitors
2. Top 10 pages
3. Traffic sources (referrers)
4. Geographic distribution
5. Device & browser detection
6. Performance metrics
7. 404 errors
8. Hourly traffic patterns

---

## Architecture

```
┌─────────┐
│ Visitor │
└────┬────┘
     │
     ↓
┌────────────────┐        ┌──────────────────┐
│   CloudFront   │───────→│  S3 Static Site  │
└────┬───────────┘        └──────────────────┘
     │
     │ Access Logs
     ↓
┌──────────────────────┐
│  S3 Analytics Bucket │
│  (90-day retention)  │
└──────────┬───────────┘
           │
           │ Query
           ↓
    ┌─────────────┐
    │AWS Athena   │
    │(Serverless  │
    │ SQL)        │
    └─────────────┘
```

---

## Cost Breakdown

| Item | Monthly Cost |
|------|--------------|
| S3 storage (logs) | ~€0.01 |
| Athena queries (weekly) | ~€0.04-0.09 |
| **Total** | **€0.05-0.10/month** |

**Under budget!** ✅ (< €1/month requirement)

---

## Privacy & Compliance

✅ **GDPR Compliant:** All data in your AWS account
✅ **No Third-Party Tracking:** No external analytics services
✅ **IP Addresses:** Logged but not personally identifiable
✅ **Data Retention:** Auto-delete after 90 days
✅ **Full Control:** You own 100% of the data

---

## Metrics Available

### Traffic Metrics
- Page views (daily, weekly, monthly)
- Unique visitors (by IP)
- Pages per session
- Traffic sources (referrers)

### Content Performance
- Top pages
- Least visited pages
- 404 errors (broken links)

### Audience Insights
- Geographic distribution (country codes)
- Device types (mobile, tablet, desktop)
- Browsers (Chrome, Safari, Firefox, etc.)

### Technical Metrics
- Response times (avg, p95, max)
- Cache hit rates
- Error rates (4xx, 5xx)
- Hourly traffic patterns

---

## Limitations

✅ **Real-time metrics** (CloudWatch Dashboard - requests, bandwidth, errors)
❌ **No session tracking** (IP-based, not cookie-based)
❌ **Delayed detailed logs** (arrive 15-30 min after request)
❌ **Manual Athena queries** (must run SQL yourself for detailed analysis)

**If you need session tracking:** Consider adding GoatCounter (free, privacy-focused, no infrastructure changes)

---

## Recommended Usage

### Weekly Check (Every Monday)
- Quick query: page views & unique visitors last 7 days
- Cost: ~€0.01

### Monthly Deep Dive (1st of Month)
- Run all 8 pre-built queries
- Export to Google Sheets
- Create monthly report
- Cost: ~€0.05-0.08

### As-Needed
- Troubleshoot traffic drops
- Investigate 404 errors
- Check performance issues

---

## Troubleshooting

See [athena-setup.md - Troubleshooting](./athena-setup.md#troubleshooting)

Common issues:
- No logs appearing (wait 30 min)
- Athena query fails (check bucket name)
- No results returned (check date range)

---

## Future Enhancements

### Phase 1 (Current)
✅ CloudFront logging enabled
✅ 90-day retention
✅ 8 pre-built SQL queries

### Phase 2 (Optional)
- [ ] Partitioned tables (better performance for large datasets)
- [ ] Automated monthly reports (Lambda + SES)
- [ ] QuickSight dashboard (€9/month - if budget allows)

### Phase 3 (Optional)
- [ ] Real-time dashboard with GoatCounter (free)
- [ ] Custom event tracking (button clicks, form submissions)
- [ ] A/B testing integration

---

**Last Updated:** 2025-12-27
