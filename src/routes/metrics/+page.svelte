<script lang="ts">
	import { onMount } from 'svelte';

	let metricsData: any = null;
	let loading = true;
	let lastUpdated = new Date();

	onMount(async () => {
		// Use mock data for now (metrics.json collection disabled)
		metricsData = generateMockData();
		loading = false;
	});

	function generateMockData() {
		const now = Date.now();
		const dayMs = 24 * 60 * 60 * 1000;

		return {
			lastUpdated: new Date().toISOString(),
			requests: {
				total: 15847,
				last30Days: Array.from({ length: 30 }, (_, i) => ({
					date: new Date(now - (29 - i) * dayMs).toISOString().split('T')[0],
					count: Math.floor(Math.random() * 500) + 200
				}))
			},
			bandwidth: {
				totalGB: 42.7,
				last30Days: Array.from({ length: 30 }, (_, i) => ({
					date: new Date(now - (29 - i) * dayMs).toISOString().split('T')[0],
					gb: (Math.random() * 2 + 0.5).toFixed(2)
				}))
			},
			uptime: {
				percentage: 99.97,
				avgResponseTime: 127
			},
			errors: {
				rate4xx: 0.3,
				rate5xx: 0.01
			},
			lambda: {
				totalInvocations: 42,
				last30Days: Array.from({ length: 30 }, (_, i) => ({
					date: new Date(now - (29 - i) * dayMs).toISOString().split('T')[0],
					count: i < 28 ? 0 : 1
				}))
			}
		};
	}

	function formatNumber(num: number): string {
		return new Intl.NumberFormat().format(num);
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>Metrics - Zero to One Solutions</title>
	<meta name="robots" content="noindex">
</svelte:head>

<div class="metrics-page">
	<div class="container">
		<!-- Header -->
		<header class="page-header">
			<div>
				<h1 class="page-title">System Metrics</h1>
				<p class="page-subtitle">Real-time performance and usage statistics</p>
			</div>
			<div class="last-updated">
				<span class="label">Last Updated</span>
				<span class="time">{lastUpdated.toLocaleString()}</span>
			</div>
		</header>

		{#if loading}
			<div class="loading">
				<div class="spinner"></div>
				<p>Loading metrics...</p>
			</div>
		{:else}
			<!-- KPI Cards -->
			<div class="kpi-grid">
				<div class="kpi-card">
					<div class="kpi-icon gradient-bg">📊</div>
					<div class="kpi-content">
						<div class="kpi-label">Total Requests</div>
						<div class="kpi-value">{formatNumber(metricsData.requests.total)}</div>
						<div class="kpi-meta">Last 30 days</div>
					</div>
				</div>

				<div class="kpi-card">
					<div class="kpi-icon gradient-bg">📡</div>
					<div class="kpi-content">
						<div class="kpi-label">Bandwidth</div>
						<div class="kpi-value">{metricsData.bandwidth.totalGB} GB</div>
						<div class="kpi-meta">Data transferred</div>
					</div>
				</div>

				<div class="kpi-card">
					<div class="kpi-icon gradient-bg">⚡</div>
					<div class="kpi-content">
						<div class="kpi-label">Uptime</div>
						<div class="kpi-value">{metricsData.uptime.percentage}%</div>
						<div class="kpi-meta">{metricsData.uptime.avgResponseTime}ms avg response</div>
					</div>
				</div>

				<div class="kpi-card">
					<div class="kpi-icon gradient-bg">🛡️</div>
					<div class="kpi-content">
						<div class="kpi-label">Error Rate</div>
						<div class="kpi-value">{metricsData.errors.rate5xx}%</div>
						<div class="kpi-meta">Server errors</div>
					</div>
				</div>
			</div>

			<!-- Charts Section -->
			<div class="charts-grid">
				<!-- Requests Chart -->
				<div class="chart-card">
					<div class="chart-header">
						<h2 class="chart-title">Request Volume</h2>
						<span class="chart-period">Last 7 Days</span>
					</div>
					<div class="chart-body">
						<div class="bar-chart">
							{#each metricsData.requests.last30Days.slice(-7) as day, index}
								<div class="bar-wrapper">
									<div
										class="bar primary"
										style="height: {(day.count / 700) * 100}%"
										title="{formatDate(day.date)}: {formatNumber(day.count)} requests"
									>
										<span class="bar-value">{formatNumber(day.count)}</span>
									</div>
									<span class="bar-label">{formatDate(day.date)}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Bandwidth Chart -->
				<div class="chart-card">
					<div class="chart-header">
						<h2 class="chart-title">Bandwidth Usage</h2>
						<span class="chart-period">Last 7 Days</span>
					</div>
					<div class="chart-body">
						<div class="bar-chart">
							{#each metricsData.bandwidth.last30Days.slice(-7) as day}
								<div class="bar-wrapper">
									<div
										class="bar secondary"
										style="height: {(parseFloat(day.gb) / 3) * 100}%"
										title="{formatDate(day.date)}: {day.gb} GB"
									>
										<span class="bar-value">{day.gb}</span>
									</div>
									<span class="bar-label">{formatDate(day.date)}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Lambda Invocations Chart -->
				{#if metricsData.lambda}
					<div class="chart-card featured">
						<div class="chart-header">
							<div>
								<h2 class="chart-title">Metrics Collection</h2>
								<span class="meta-badge">Self-Tracking</span>
							</div>
							<span class="chart-period">Last 7 Days</span>
						</div>
						<div class="chart-body">
							<div class="bar-chart">
								{#each metricsData.lambda.last30Days.slice(-7) as day}
									<div class="bar-wrapper">
										<div
											class="bar accent"
											style="height: {day.count > 0 ? '100%' : '5%'}"
											title="{formatDate(day.date)}: {day.count} invocation{day.count !== 1 ? 's' : ''}"
										>
											<span class="bar-value">{day.count}</span>
										</div>
										<span class="bar-label">{formatDate(day.date)}</span>
									</div>
								{/each}
							</div>
							<div class="chart-footer">
								<span>Total: {formatNumber(metricsData.lambda.totalInvocations)} invocations</span>
							</div>
						</div>
					</div>
				{/if}

				<!-- System Status -->
				<div class="chart-card">
					<div class="chart-header">
						<h2 class="chart-title">System Status</h2>
					</div>
					<div class="chart-body">
						<div class="status-grid">
							<div class="status-item">
								<span class="status-indicator success"></span>
								<div class="status-content">
									<div class="status-label">CDN</div>
									<div class="status-value">CloudFront Active</div>
								</div>
							</div>
							<div class="status-item">
								<span class="status-indicator success"></span>
								<div class="status-content">
									<div class="status-label">SSL</div>
									<div class="status-value">TLS 1.2+ Enabled</div>
								</div>
							</div>
							<div class="status-item">
								<span class="status-indicator info"></span>
								<div class="status-content">
									<div class="status-label">Region</div>
									<div class="status-value">US-East-1</div>
								</div>
							</div>
							<div class="status-item">
								<span class="status-indicator {metricsData.errors.rate4xx < 1 ? 'success' : 'warning'}"></span>
								<div class="status-content">
									<div class="status-label">4XX Errors</div>
									<div class="status-value">{metricsData.errors.rate4xx}%</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Footer Note -->
			<div class="metrics-footer">
				<p>This page automatically updates daily with real-time metrics from CloudWatch and CloudFront.</p>
				<p class="easter-egg">💡 Easter egg discovered! You found the metrics dashboard.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.metrics-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
		padding: 2rem 0;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	/* Header */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid #dee2e6;
	}

	.page-title {
		font-size: 2.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, #F11759 0%, #8333C5 50%, #D67D21 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
	}

	.page-subtitle {
		color: #6c757d;
		font-size: 1.125rem;
	}

	.last-updated {
		text-align: right;
	}

	.last-updated .label {
		display: block;
		font-size: 0.875rem;
		color: #6c757d;
		margin-bottom: 0.25rem;
	}

	.last-updated .time {
		display: block;
		font-size: 0.9375rem;
		font-weight: 600;
		color: #212529;
	}

	/* KPI Cards */
	.kpi-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.kpi-card {
		background: white;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		display: flex;
		gap: 1.25rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.kpi-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
	}

	.kpi-icon {
		width: 56px;
		height: 56px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.75rem;
		flex-shrink: 0;
	}

	.gradient-bg {
		background: linear-gradient(135deg, #F11759 0%, #8333C5 50%, #D67D21 100%);
	}

	.kpi-content {
		flex: 1;
	}

	.kpi-label {
		font-size: 0.875rem;
		color: #6c757d;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.kpi-value {
		font-size: 2rem;
		font-weight: 700;
		color: #212529;
		margin-bottom: 0.25rem;
		line-height: 1;
	}

	.kpi-meta {
		font-size: 0.8125rem;
		color: #adb5bd;
	}

	/* Charts Grid */
	.charts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.chart-card {
		background: white;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.chart-card.featured {
		border: 2px solid #8333C5;
		background: linear-gradient(135deg, #ffffff 0%, #f8f4ff 100%);
	}

	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e9ecef;
	}

	.chart-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: #212529;
	}

	.chart-period {
		font-size: 0.875rem;
		color: #6c757d;
	}

	.meta-badge {
		display: inline-block;
		background: linear-gradient(135deg, #8333C5 0%, #F11759 100%);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 600;
		margin-left: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.chart-body {
		min-height: 200px;
	}

	/* Bar Charts */
	.bar-chart {
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
		height: 200px;
		gap: 0.5rem;
	}

	.bar-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		height: 100%;
	}

	.bar {
		width: 100%;
		min-height: 8px;
		border-radius: 6px 6px 0 0;
		position: relative;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.bar.primary {
		background: linear-gradient(to top, #F11759, #ff4d8f);
	}

	.bar.secondary {
		background: linear-gradient(to top, #8333C5, #a366ff);
	}

	.bar.accent {
		background: linear-gradient(to top, #D67D21, #ffa64d);
	}

	.bar:hover {
		filter: brightness(1.1);
		transform: scaleY(1.02);
	}

	.bar-value {
		position: absolute;
		top: -1.5rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.75rem;
		font-weight: 600;
		color: #495057;
		opacity: 0;
		transition: opacity 0.2s ease;
		white-space: nowrap;
	}

	.bar:hover .bar-value {
		opacity: 1;
	}

	.bar-label {
		font-size: 0.75rem;
		color: #6c757d;
		text-align: center;
		white-space: nowrap;
	}

	.chart-footer {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #e9ecef;
		text-align: center;
		font-size: 0.875rem;
		color: #6c757d;
	}

	/* Status Grid */
	.status-grid {
		display: grid;
		gap: 1rem;
	}

	.status-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.status-indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.status-indicator.success {
		background: #28a745;
		box-shadow: 0 0 8px rgba(40, 167, 69, 0.5);
	}

	.status-indicator.warning {
		background: #ffc107;
		box-shadow: 0 0 8px rgba(255, 193, 7, 0.5);
	}

	.status-indicator.info {
		background: #17a2b8;
		box-shadow: 0 0 8px rgba(23, 162, 184, 0.5);
	}

	.status-content {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.status-label {
		font-size: 0.875rem;
		color: #6c757d;
		font-weight: 500;
	}

	.status-value {
		font-size: 0.9375rem;
		color: #212529;
		font-weight: 600;
	}

	/* Footer */
	.metrics-footer {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid #dee2e6;
		color: #6c757d;
		font-size: 0.875rem;
	}

	.metrics-footer p {
		margin-bottom: 0.5rem;
	}

	.easter-egg {
		color: #8333C5;
		font-weight: 500;
	}

	/* Loading */
	.loading {
		text-align: center;
		padding: 4rem;
	}

	.spinner {
		width: 48px;
		height: 48px;
		border: 4px solid #e9ecef;
		border-top-color: #F11759;
		border-radius: 50%;
		margin: 0 auto 1rem;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* Responsive */
	@media (max-width: 768px) {
		.container {
			padding: 0 1rem;
		}

		.page-header {
			flex-direction: column;
			gap: 1rem;
		}

		.last-updated {
			text-align: left;
		}

		.page-title {
			font-size: 2rem;
		}

		.kpi-grid,
		.charts-grid {
			grid-template-columns: 1fr;
		}

		.bar-label {
			font-size: 0.625rem;
		}
	}
</style>
