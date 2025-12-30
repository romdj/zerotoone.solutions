<script lang="ts">
	import '$lib/styles/homepage.css';

	export let company: string;
	export let logo: string;
	export let title: string;
	export let role: string;
	export let tags: string[];
</script>

<main class="case-study">
	<!-- Hero Section -->
	<section class="case-hero">
		<div class="container">
			<a href="/work" class="back-link">← Back to Work</a>
			<div class="company-logo-large">
				<img src={logo} alt={company} />
			</div>
			<h1 class="case-title">{title}</h1>
			<div class="case-meta">
				<span class="meta-item"><strong>Company:</strong> {company}</span>
				<span class="meta-item"><strong>Role:</strong> {role}</span>
			</div>
			<div class="case-tags">
				{#each tags as tag}
					<span class="pill">{tag}</span>
				{/each}
			</div>
		</div>
	</section>

	<!-- Content Sections -->
	<div class="case-content">
		<div class="container">
			<slot />
		</div>
	</div>

	<!-- CTA Section -->
	<section class="case-cta">
		<div class="container">
			<h2>Ready to discuss your next transformation?</h2>
			<p>Let's explore how we can work together to solve your complex challenges.</p>
			<a href="/contact" class="cta-button">Start a Conversation</a>
		</div>
	</section>
</main>

<style>
	.case-study {
		background: var(--white);
		min-height: 100vh;
	}

	/* Hero Section */
	.case-hero {
		padding: 80px 0 60px;
		background: var(--gray-100);
		border-bottom: 1px solid var(--gray-400);
	}

	.back-link {
		display: inline-block;
		color: var(--pink);
		text-decoration: none;
		font-weight: 500;
		margin-bottom: 32px;
		transition: opacity 0.2s;
	}

	.back-link:hover {
		opacity: 0.8;
	}

	.company-logo-large {
		height: 80px;
		margin-bottom: 32px;
		display: flex;
		align-items: center;
	}

	.company-logo-large img {
		max-height: 100%;
		max-width: 300px;
		width: auto;
		object-fit: contain;
	}

	.case-title {
		font-size: 48px;
		font-weight: 700;
		line-height: 1.2;
		margin: 0 0 24px 0;
		color: var(--ink);
	}

	.case-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		margin-bottom: 24px;
		font-size: 16px;
		color: var(--gray-600);
	}

	.meta-item strong {
		color: var(--ink);
	}

	.case-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	/* Content Section */
	.case-content {
		padding: 80px 0;
	}

	.case-content :global(section) {
		margin-bottom: 64px;
	}

	.case-content :global(section:last-child) {
		margin-bottom: 0;
	}

	.case-content :global(h2) {
		font-size: 32px;
		font-weight: 700;
		margin: 0 0 24px 0;
		color: var(--ink);
	}

	.case-content :global(h3) {
		font-size: 24px;
		font-weight: 600;
		margin: 32px 0 16px 0;
		color: var(--ink);
	}

	.case-content :global(p) {
		font-size: 18px;
		line-height: 1.7;
		color: var(--gray-600);
		margin: 0 0 16px 0;
	}

	.case-content :global(ul) {
		margin: 16px 0;
		padding-left: 24px;
	}

	.case-content :global(li) {
		font-size: 18px;
		line-height: 1.7;
		color: var(--gray-600);
		margin-bottom: 12px;
	}

	.case-content :global(.highlight-box) {
		background: var(--gray-100);
		border-left: 4px solid var(--pink);
		padding: 24px;
		margin: 32px 0;
		border-radius: 4px;
	}

	.case-content :global(.two-column) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		margin: 32px 0;
	}

	/* CTA Section */
	.case-cta {
		padding: 80px 0;
		background: linear-gradient(135deg, var(--pink), var(--purple), var(--orange));
		text-align: center;
		color: var(--white);
	}

	.case-cta h2 {
		font-size: 36px;
		font-weight: 700;
		margin: 0 0 16px 0;
		color: var(--white);
	}

	.case-cta p {
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
	:global(html[data-theme="dark"]) .case-study {
		background: #0a0a0a;
	}

	:global(html[data-theme="dark"]) .case-hero {
		background: #1a1a1a;
		border-color: #333;
	}

	:global(html[data-theme="dark"]) .company-logo-large img {
		filter: brightness(0) invert(1);
	}

	:global(html[data-theme="dark"]) .case-title,
	:global(html[data-theme="dark"]) .case-content :global(h2),
	:global(html[data-theme="dark"]) .case-content :global(h3) {
		color: #f5f5f5;
	}

	:global(html[data-theme="dark"]) .meta-item strong {
		color: #f5f5f5;
	}

	:global(html[data-theme="dark"]) .case-content :global(p),
	:global(html[data-theme="dark"]) .case-content :global(li) {
		color: #d0d0d0;
	}

	:global(html[data-theme="dark"]) .case-content :global(.highlight-box) {
		background: #1a1a1a;
		border-color: var(--pink);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.case-title {
			font-size: 32px;
		}

		.case-meta {
			flex-direction: column;
			gap: 12px;
		}

		.case-content :global(h2) {
			font-size: 28px;
		}

		.case-content :global(.two-column) {
			grid-template-columns: 1fr;
			gap: 24px;
		}

		.case-cta h2 {
			font-size: 28px;
		}
	}
</style>
