<script lang="ts">
	import '$lib/styles/homepage.css';
</script>

<svelte:head>
	<title>In-House Solutions | Zero to One Solutions</title>
	<meta name="description" content="From idea to venture. We build products, platforms, and companies - bringing technical excellence, business acumen, and proven leadership." />
</svelte:head>

<main class="in-house-landing">
	<!-- Hero Section -->
	<section class="hero">
		<div class="container">
			<h1 class="hero-headline">
				<span class="gradient-text">In-House Solutions</span>
			</h1>
			<p class="hero-subheadline">
				From Idea to Venture
			</p>
			<p class="hero-description">
				We don't just build software—we build businesses. Whether you're a founder with a vision, an exec with a moonshot, or a team ready to scale, we bring the full stack: technical excellence, business architecture, and proven leadership.
			</p>
		</div>
	</section>

	<!-- Navigation Cards -->
	<section class="offerings-section">
		<div class="container">
			<div class="offerings-grid">
				<!-- Products -->
				<a href="/in-house/products" class="offering-card">
					<div class="card-content">
						<h2>Products</h2>
						<p class="offering-description">
							From MVP to market-ready platform. We architect, build, and ship products that scale—with the business acumen to make them fundable ventures.
						</p>
						<div class="card-footer">
							<span class="cta-link">Explore Products →</span>
						</div>
					</div>
				</a>

				<!-- Companies (Coming Soon) -->
				<div class="offering-card disabled">
					<div class="card-content">
						<h2>Companies</h2>
						<p class="offering-description">
							Venture studio partnerships and company building. Strategic investment, hands-on execution, and the leadership to reach the three commas club.
						</p>
						<div class="card-footer">
							<span class="coming-soon-badge">Coming Soon</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Value Proposition -->
	<section class="value-proposition">
		<div class="container">
			<h2 class="section-heading">The Full Stack Approach</h2>
			<div class="value-grid">
				<div class="value-item">
					<h3>Technical Excellence</h3>
					<p>
						Enterprise-grade architecture. Event-driven platforms. Cloud-native infrastructure. We've built systems for Nike, Philips, and national energy grids—we know what scales.
					</p>
				</div>
				<div class="value-item">
					<h3>Business Architecture</h3>
					<p>
						Unit economics. Go-to-market strategy. Competitive moats. Network effects. Building a unicorn requires more than great code—it requires business thinking.
					</p>
				</div>
				<div class="value-item">
					<h3>Proven Leadership</h3>
					<p>
						Team building. Stakeholder management. Board advisory. We've led teams of 12+ through enterprise transformations. We bring the leadership that scales.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="final-cta">
		<div class="container">
			<h2 class="cta-heading">Creating Tomorrow, Today</h2>
			<p class="cta-description">
				You bring the vision. We bring the execution.
			</p>
			<a href="/contact" class="cta-button">
				Let's Build Together
			</a>
		</div>
	</section>
</main>

<style>
	.in-house-landing {
		background: var(--white);
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--pink), var(--purple), var(--orange));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Offerings Section */
	.offerings-section {
		padding: 80px 0;
		background: var(--gray-100);
	}

	.offerings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 32px;
		margin-top: 48px;
	}

	.offering-card {
		background: var(--white);
		border: 2px solid transparent;
		background: linear-gradient(var(--white), var(--white)) padding-box,
		            linear-gradient(135deg, var(--pink), var(--purple)) border-box;
		border-radius: 12px;
		padding: 40px;
		text-decoration: none;
		display: block;
		transition: all 0.3s ease;
		position: relative;
	}

	.offering-card.disabled {
		background: var(--white);
		border: 2px solid var(--gray-400);
		opacity: 0.7;
		cursor: not-allowed;
	}

	.offering-card:not(.disabled):hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
	}

	.card-content h2 {
		font-size: 32px;
		font-weight: 700;
		margin: 0 0 16px 0;
		color: var(--ink);
	}

	.offering-description {
		font-size: 18px;
		line-height: 1.6;
		color: var(--gray-600);
		margin: 0 0 24px 0;
	}

	.card-footer {
		margin-top: 24px;
	}

	.cta-link {
		color: var(--pink);
		font-weight: 600;
		font-size: 16px;
	}

	.coming-soon-badge {
		display: inline-block;
		padding: 8px 16px;
		background: var(--gray-400);
		color: var(--white);
		border-radius: 20px;
		font-size: 14px;
		font-weight: 600;
	}

	/* Value Proposition */
	.value-proposition {
		padding: 80px 0;
	}

	.value-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 32px;
		margin-top: 48px;
	}

	.value-item h3 {
		font-size: 24px;
		font-weight: 700;
		margin: 0 0 12px 0;
		color: var(--ink);
	}

	.value-item p {
		font-size: 16px;
		line-height: 1.7;
		color: var(--gray-600);
		margin: 0;
	}

	/* CTA Section */
	.final-cta {
		padding: 120px 0;
		background: linear-gradient(135deg, var(--pink), var(--purple), var(--orange));
		text-align: center;
		color: var(--white);
	}

	.cta-heading {
		font-size: 40px;
		font-weight: 700;
		margin: 0 0 16px 0;
		color: var(--white);
	}

	.cta-description {
		font-size: 18px;
		margin: 0 0 32px 0;
		color: rgba(255, 255, 255, 0.9);
	}

	.cta-button {
		display: inline-block;
		padding: 16px 32px;
		background: var(--white);
		color: var(--pink);
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 16px;
		transition: all 0.3s ease;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}

	/* Dark mode */
	:global(html[data-theme="dark"]) .in-house-landing {
		background: #0a0a0a;
	}

	:global(html[data-theme="dark"]) .offerings-section,
	:global(html[data-theme="dark"]) .value-proposition {
		background: #1a1a1a;
	}

	:global(html[data-theme="dark"]) .offering-card {
		background: linear-gradient(#0a0a0a, #0a0a0a) padding-box,
		            linear-gradient(135deg, var(--pink), var(--purple)) border-box;
	}

	:global(html[data-theme="dark"]) .offering-card.disabled {
		background: #0a0a0a;
		border-color: #333;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.offerings-grid {
			grid-template-columns: 1fr;
		}

		.cta-heading {
			font-size: 32px;
		}
	}
</style>
