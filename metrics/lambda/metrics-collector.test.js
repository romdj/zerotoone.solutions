const { CloudWatchClient, GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Mock only the Client classes, not the Commands
jest.mock("@aws-sdk/client-cloudwatch", () => {
    const actual = jest.requireActual("@aws-sdk/client-cloudwatch");
    return {
        ...actual,
        CloudWatchClient: jest.fn(),
    };
});

jest.mock("@aws-sdk/client-s3", () => {
    const actual = jest.requireActual("@aws-sdk/client-s3");
    return {
        ...actual,
        S3Client: jest.fn(),
    };
});

const { handler, _resetClients } = require('./metrics-collector');

describe('Metrics Collector Lambda', () => {
    let mockCloudWatchSend;
    let mockS3Send;
    const originalEnv = process.env;

    beforeEach(() => {
        // Reset mocks and clients
        jest.clearAllMocks();
        _resetClients();

        // Setup environment variables
        process.env = {
            ...originalEnv,
            DISTRIBUTION_ID: 'test-dist-id',
            BUCKET_NAME: 'test-bucket',
            AWS_REGION: 'eu-north-1',
            AWS_LAMBDA_FUNCTION_NAME: 'test-function'
        };

        // Mock CloudWatch client
        mockCloudWatchSend = jest.fn();
        CloudWatchClient.mockImplementation(() => ({
            send: mockCloudWatchSend
        }));

        // Mock S3 client
        mockS3Send = jest.fn();
        S3Client.mockImplementation(() => ({
            send: mockS3Send
        }));
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    describe('handler', () => {
        it('should successfully collect metrics and upload to S3', async () => {
            // Mock CloudWatch responses
            mockCloudWatchSend.mockResolvedValue({
                Datapoints: [
                    { Timestamp: new Date('2024-01-01'), Sum: 100 },
                    { Timestamp: new Date('2024-01-02'), Sum: 150 }
                ]
            });

            // Mock S3 upload success
            mockS3Send.mockResolvedValue({});

            const result = await handler({});

            expect(result.statusCode).toBe(200);
            expect(mockCloudWatchSend).toHaveBeenCalled();
            expect(mockS3Send).toHaveBeenCalled();

            // Verify S3 upload was called with correct parameters
            const s3Command = mockS3Send.mock.calls[0][0];
            expect(s3Command.input.Bucket).toBe('test-bucket');
            expect(s3Command.input.Key).toBe('metrics.json');
            expect(s3Command.input.ContentType).toBe('application/json');
        });

        it('should calculate total requests correctly', async () => {
            mockCloudWatchSend.mockResolvedValue({
                Datapoints: [
                    { Timestamp: new Date('2024-01-01'), Sum: 100 },
                    { Timestamp: new Date('2024-01-02'), Sum: 200 },
                    { Timestamp: new Date('2024-01-03'), Sum: 300 }
                ]
            });

            mockS3Send.mockResolvedValue({});

            await handler({});

            const uploadedData = JSON.parse(mockS3Send.mock.calls[0][0].input.Body);
            expect(uploadedData.requests.total).toBe(600);
        });

        it('should convert bandwidth to GB correctly', async () => {
            // Mock 1GB in bytes (1,073,741,824 bytes)
            mockCloudWatchSend.mockResolvedValue({
                Datapoints: [
                    { Timestamp: new Date('2024-01-01'), Sum: 1073741824 }
                ]
            });

            mockS3Send.mockResolvedValue({});

            await handler({});

            const uploadedData = JSON.parse(mockS3Send.mock.calls[0][0].input.Body);
            expect(parseFloat(uploadedData.bandwidth.totalGB)).toBeCloseTo(1.0, 1);
        });

        it('should calculate uptime percentage correctly', async () => {
            // Mock 0.05% error rate = 99.95% uptime
            mockCloudWatchSend.mockImplementation((command) => {
                if (command.input.MetricName === '5xxErrorRate') {
                    return Promise.resolve({
                        Datapoints: [
                            { Timestamp: new Date('2024-01-01'), Average: 0.05 }
                        ]
                    });
                }
                return Promise.resolve({ Datapoints: [] });
            });

            mockS3Send.mockResolvedValue({});

            await handler({});

            const uploadedData = JSON.parse(mockS3Send.mock.calls[0][0].input.Body);
            expect(uploadedData.uptime.percentage).toBeCloseTo(99.95, 2);
        });

        it('should aggregate metrics by day correctly', async () => {
            // Use actual current time for realistic test
            const now = new Date();
            const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

            mockCloudWatchSend.mockResolvedValue({
                Datapoints: [
                    { Timestamp: threeDaysAgo, Sum: 100 },
                    { Timestamp: now, Sum: 200 }
                ]
            });

            mockS3Send.mockResolvedValue({});

            await handler({});

            const uploadedData = JSON.parse(mockS3Send.mock.calls[0][0].input.Body);
            expect(uploadedData.requests.last30Days).toHaveLength(30);
            // Day 29 is the most recent day (today), day 26 is 3 days ago
            expect(uploadedData.requests.last30Days[29].count).toBeGreaterThan(0);
        });

        it('should track Lambda invocations (meta functionality)', async () => {
            mockCloudWatchSend.mockImplementation((command) => {
                if (command.input.Namespace === 'AWS/Lambda') {
                    return Promise.resolve({
                        Datapoints: [
                            { Timestamp: new Date('2024-01-01'), Sum: 1 },
                            { Timestamp: new Date('2024-01-02'), Sum: 1 }
                        ]
                    });
                }
                return Promise.resolve({ Datapoints: [] });
            });

            mockS3Send.mockResolvedValue({});

            await handler({});

            const uploadedData = JSON.parse(mockS3Send.mock.calls[0][0].input.Body);
            expect(uploadedData.lambda).toBeDefined();
            expect(uploadedData.lambda.totalInvocations).toBe(2);
        });

        it('should handle CloudWatch errors gracefully', async () => {
            mockCloudWatchSend.mockRejectedValue(new Error('CloudWatch API Error'));

            await expect(handler({})).rejects.toThrow('CloudWatch API Error');
        });

        it('should handle S3 upload errors gracefully', async () => {
            mockCloudWatchSend.mockResolvedValue({ Datapoints: [] });
            mockS3Send.mockRejectedValue(new Error('S3 Upload Error'));

            await expect(handler({})).rejects.toThrow('S3 Upload Error');
        });

        it('should set correct cache control headers on S3 object', async () => {
            mockCloudWatchSend.mockResolvedValue({ Datapoints: [] });
            mockS3Send.mockResolvedValue({});

            await handler({});

            const s3CallArg = mockS3Send.mock.calls[0][0];
            expect(s3CallArg.input.CacheControl).toBe('public, max-age=3600');
        });

        it('should include timestamp in response', async () => {
            mockCloudWatchSend.mockResolvedValue({ Datapoints: [] });
            mockS3Send.mockResolvedValue({});

            const result = await handler({});
            const body = JSON.parse(result.body);

            expect(body.timestamp).toBeDefined();
            expect(new Date(body.timestamp)).toBeInstanceOf(Date);
        });

        it('should query metrics for all required CloudFront metrics', async () => {
            mockCloudWatchSend.mockResolvedValue({ Datapoints: [] });
            mockS3Send.mockResolvedValue({});

            await handler({});

            const metricsCalled = mockCloudWatchSend.mock.calls
                .filter(call => call[0].input.Namespace === 'AWS/CloudFront')
                .map(call => call[0].input.MetricName);

            expect(metricsCalled).toContain('Requests');
            expect(metricsCalled).toContain('BytesDownloaded');
            expect(metricsCalled).toContain('4xxErrorRate');
            expect(metricsCalled).toContain('5xxErrorRate');
        });

        it('should handle empty datapoints gracefully', async () => {
            mockCloudWatchSend.mockResolvedValue({ Datapoints: [] });
            mockS3Send.mockResolvedValue({});

            const result = await handler({});

            expect(result.statusCode).toBe(200);

            const uploadedData = JSON.parse(mockS3Send.mock.calls[0][0].input.Body);
            expect(uploadedData.requests.total).toBe(0);
            expect(uploadedData.bandwidth.totalGB).toBe('0.00');
        });
    });
});
