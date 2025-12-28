#!/bin/bash
# Simple analytics viewer for zerotoone.solutions
# Displays key metrics from CloudFront logs

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Zero to One Solutions Analytics ===${NC}\n"

# Get the analytics bucket name from Pulumi
cd pulumi
ANALYTICS_BUCKET=$(pulumi stack output analyticsBucketName 2>/dev/null || echo "")
DASHBOARD_URL=$(pulumi stack output dashboardUrl 2>/dev/null || echo "")
cd ..

if [ -z "$ANALYTICS_BUCKET" ]; then
    echo -e "${YELLOW}Analytics not yet configured. Deploy with Pulumi first.${NC}"
    exit 1
fi

echo -e "${GREEN}Analytics Bucket:${NC} $ANALYTICS_BUCKET"
echo -e "${GREEN}Dashboard URL:${NC} $DASHBOARD_URL"
echo ""

# Check if logs exist
LOG_COUNT=$(aws s3 ls s3://$ANALYTICS_BUCKET/cloudfront-logs/ --recursive 2>/dev/null | wc -l || echo "0")

if [ "$LOG_COUNT" -eq "0" ]; then
    echo -e "${YELLOW}No logs available yet. CloudFront logs can take up to 24 hours to appear.${NC}"
    echo ""
    echo "In the meantime, you can:"
    echo "  1. View real-time metrics: $DASHBOARD_URL"
    echo "  2. Check back tomorrow for detailed access logs"
    exit 0
fi

echo -e "${GREEN}Log files found:${NC} $LOG_COUNT files"
echo ""

# Quick stats from recent logs (last 5 files)
echo -e "${BLUE}Recent Activity (last 5 log files):${NC}"
aws s3 ls s3://$ANALYTICS_BUCKET/cloudfront-logs/ --recursive | \
    tail -5 | \
    awk '{print "  " $1 " " $2 " - " $4}'
echo ""

echo -e "${BLUE}Quick Stats:${NC}"
echo "For detailed analytics, use one of these options:"
echo ""
echo "  1. ${GREEN}CloudWatch Dashboard${NC} (real-time metrics):"
echo "     $DASHBOARD_URL"
echo ""
echo "  2. ${GREEN}Athena Queries${NC} (detailed log analysis):"
echo "     See docs/analytics/athena-setup.md for pre-built queries"
echo ""
echo "  3. ${GREEN}Download Recent Logs${NC}:"
echo "     aws s3 sync s3://$ANALYTICS_BUCKET/cloudfront-logs/ ./analytics-logs/ --exclude '*' --include '*.gz' --exclude '*' --include \"$(date +%Y-%m-%d)*\""
