const { CloudWatchClient, GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
// S3 client removed - metrics.json upload disabled

// Initialize CloudWatch client lazily to allow for easier testing
let cloudwatch;

function getCloudWatchClient() {
    if (!cloudwatch) {
        cloudwatch = new CloudWatchClient({ region: process.env.AWS_REGION || 'eu-north-1' });
    }
    return cloudwatch;
}

exports.handler = async (event) => {
    console.log('Starting metrics collection...');

    const distributionId = process.env.DISTRIBUTION_ID;
    const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
    // Note: BUCKET_NAME removed - S3 upload disabled

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    try {
        // Collect CloudFront metrics
        const [requests, bandwidth, errors4xx, errors5xx, lambdaInvocations] = await Promise.all([
            getMetric('Requests', 'Sum', distributionId, thirtyDaysAgo, now),
            getMetric('BytesDownloaded', 'Sum', distributionId, thirtyDaysAgo, now),
            getMetric('4xxErrorRate', 'Average', distributionId, thirtyDaysAgo, now),
            getMetric('5xxErrorRate', 'Average', distributionId, thirtyDaysAgo, now),
            getLambdaInvocations(functionName, thirtyDaysAgo, now)
        ]);

        // Calculate totals and aggregates
        const totalRequests = requests.reduce((sum, point) => sum + point.value, 0);
        const totalBandwidthBytes = bandwidth.reduce((sum, point) => sum + point.value, 0);
        const totalBandwidthGB = (totalBandwidthBytes / (1024 * 1024 * 1024)).toFixed(2);
        const totalLambdaInvocations = lambdaInvocations.reduce((sum, point) => sum + point.value, 0);

        // Calculate average error rates
        const avg4xx = calculateAverage(errors4xx);
        const avg5xx = calculateAverage(errors5xx);

        // Build metrics object
        const metrics = {
            lastUpdated: now.toISOString(),
            requests: {
                total: Math.round(totalRequests),
                last30Days: aggregateByDay(requests, thirtyDaysAgo, now)
            },
            bandwidth: {
                totalGB: totalBandwidthGB, // Keep as string
                last30Days: aggregateByDay(bandwidth, thirtyDaysAgo, now, true)
            },
            uptime: {
                percentage: calculateUptime(avg5xx),
                avgResponseTime: 127 // CloudFront doesn't expose this easily, using placeholder
            },
            errors: {
                rate4xx: parseFloat(avg4xx.toFixed(2)),
                rate5xx: parseFloat(avg5xx.toFixed(2))
            },
            lambda: {
                totalInvocations: Math.round(totalLambdaInvocations),
                last30Days: aggregateByDay(lambdaInvocations, thirtyDaysAgo, now)
            }
        };

        // S3 upload disabled - metrics.json collection removed
        // The Lambda still collects metrics from CloudWatch for logging/debugging
        console.log('Metrics collected:', JSON.stringify(metrics, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Metrics updated successfully',
                timestamp: now.toISOString()
            })
        };

    } catch (error) {
        console.error('Error collecting metrics:', error);
        throw error;
    }
};

async function getMetric(metricName, statistic, distributionId, startTime, endTime) {
    const params = {
        Namespace: 'AWS/CloudFront',
        MetricName: metricName,
        Dimensions: [
            {
                Name: 'DistributionId',
                Value: distributionId
            }
        ],
        StartTime: startTime,
        EndTime: endTime,
        Period: 86400, // 1 day in seconds
        Statistics: [statistic]
    };

    const command = new GetMetricStatisticsCommand(params);
    const response = await getCloudWatchClient().send(command);

    return response.Datapoints.map(point => ({
        timestamp: point.Timestamp,
        value: point[statistic] || 0
    })).sort((a, b) => a.timestamp - b.timestamp);
}

async function getLambdaInvocations(functionName, startTime, endTime) {
    const params = {
        Namespace: 'AWS/Lambda',
        MetricName: 'Invocations',
        Dimensions: [
            {
                Name: 'FunctionName',
                Value: functionName
            }
        ],
        StartTime: startTime,
        EndTime: endTime,
        Period: 86400, // 1 day
        Statistics: ['Sum']
    };

    const command = new GetMetricStatisticsCommand(params);
    const response = await getCloudWatchClient().send(command);

    return response.Datapoints.map(point => ({
        timestamp: point.Timestamp,
        value: point.Sum || 0
    })).sort((a, b) => a.timestamp - b.timestamp);
}

function aggregateByDay(datapoints, startTime, endTime, convertToGB = false) {
    const result = [];
    const dayMs = 24 * 60 * 60 * 1000;

    // Create a map for quick lookup
    const dataMap = new Map();
    datapoints.forEach(point => {
        const dateKey = point.timestamp.toISOString().split('T')[0];
        dataMap.set(dateKey, point.value);
    });

    // Generate all days in range
    for (let i = 0; i < 30; i++) {
        const date = new Date(endTime.getTime() - (29 - i) * dayMs);
        const dateKey = date.toISOString().split('T')[0];
        const value = dataMap.get(dateKey) || 0;

        result.push({
            date: dateKey,
            [convertToGB ? 'gb' : 'count']: convertToGB
                ? (value / (1024 * 1024 * 1024)).toFixed(2)
                : Math.round(value)
        });
    }

    return result;
}

function calculateAverage(datapoints) {
    if (datapoints.length === 0) return 0;
    const sum = datapoints.reduce((acc, point) => acc + point.value, 0);
    return sum / datapoints.length;
}

function calculateUptime(errorRate) {
    // Simple uptime calculation: 100 - error rate
    return parseFloat((100 - errorRate).toFixed(2));
}

// Export for testing purposes
exports._resetClients = function() {
    cloudwatch = undefined;
    s3 = undefined;
};
