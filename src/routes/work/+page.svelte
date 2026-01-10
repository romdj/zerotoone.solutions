<script lang="ts">
	import '$lib/styles/homepage.css';

	interface CaseStudy {
		slug: string;
		company: string;
		title: string;
		description: string;
		tags: string[];
		type: 'deep' | 'lightweight';
		image?: string;
	}

	const caseStudies: CaseStudy[] = [
		// {
		// 	slug: 'elia',
		// 	company: 'Elia',
		// 	title: 'Enterprise Architecture & Platform Modernization',
		// 	description: 'Architecting the future of energy infrastructure. Led 3 platform modernizations and established organization-wide standards for APIs, messaging, and cloud adoption.',
		// 	tags: ['Enterprise Architecture', 'API Standards', 'Cloud Platforms', 'Modernization'],
		// 	type: 'deep',
		// 	image: '/logos/ELIA_GROUP.svg'
		// },
		{
			slug: 'nike',
			company: 'Nike',
			title: 'Supply Chain Execution Platform',
			description: 'Architected, designed, and built cloud-native platform processing millions of supply chain events daily across global operations.',
			tags: ['Event-Driven Architecture', 'Supply Chain', 'AWS', 'Team Leadership'],
			type: 'deep',
			image: '/logos/NIKE_SWOOSH.svg'
		},
		{
			slug: 'philips',
			company: 'Philips',
			title: 'Healthcare Platform Backend Services',
			description: 'Building the secure backbone for connected healthcare. Platform services managing medical device fleets, patient data flows, and real-time health monitoring with healthcare-grade compliance.',
			tags: ['Healthcare', 'IoT', 'Serverless', 'AWS'],
			type: 'deep',
			image: '/logos/Philips_plain-text.svg'
		},
		{
			slug: 'fgtb',
			company: 'ABVV-FGTB',
			title: 'AS400 Mainframe Modernization',
			description: 'Transforming Belgium\'s largest trade union from 30-year-old mainframe to modern cloud platform. New data architecture, security layer, and microfrontend serving 1M+ members—without stopping the business.',
			tags: ['Legacy Modernization', 'Mainframe', 'CQRS', 'Microfrontends', 'Event Sourcing'],
			type: 'deep',
			image: '/logos/abvv-fgtb.png'
		},
		{
			slug: 'ibm',
			company: 'IBM',
			title: 'IoT Solutions & Energy Analytics',
			description: 'Designed end-to-end IoT solutions for industrial clients. From device data to actionable sustainability reports—helping companies track and reduce energy consumption.',
			tags: ['IoT', 'Solution Architecture', 'Energy Analytics', 'Multi-Cloud'],
			type: 'lightweight',
			image: '/logos/IBM.svg'
		},
		{
			slug: 'levis',
			company: "Levi's",
			title: 'Data Engineering for Data Science',
			description: 'Built the data foundation for Levi\'s analytics team. CI/CD pipelines, Spark workflows, and infrastructure enabling data scientists to move faster and more reliably.',
			tags: ['Data Engineering', 'Spark', 'CI/CD', 'AWS'],
			type: 'lightweight',
			image: '/logos/Levi.svg'
		},
		{
			slug: 'engie',
			company: 'Engie',
			title: 'Airport Baggage Handling Systems',
			description: 'Modernizing airport infrastructure for Engie. IoT integration between PLC controllers and cloud dashboards, transforming baggage handling from black box to real-time visibility.',
			tags: ['IoT', 'Full-Stack', 'ELK Stack', 'Industrial Systems'],
			type: 'lightweight',
			image: '/logos/Logo-engie.svg'
		},
		{
			slug: 'extra-horizon',
			company: 'Extra Horizon',
			title: 'Healthcare Platform Architecture',
			description: 'Built platform solutions connecting healthcare providers to Extra Horizon\'s health data infrastructure. Led both client integrations and internal engineering standards.',
			tags: ['Healthcare', 'Platform Design', 'AWS', 'Team Leadership'],
			type: 'lightweight',
			image: '/logos/exh-logo.png'
		}
	];

	const deepCaseStudies = caseStudies.filter(cs => cs.type === 'deep');
	const lightweightCaseStudies = caseStudies.filter(cs => cs.type === 'lightweight');
</script>

<svelte:head>
	<title>Work - Zero to One Solutions</title>
	<meta name="description" content="Explore our enterprise solutions and transformations with leading companies like Nike, IBM, Philips, and more." />
</svelte:head>

<main class="work-page">
	<!-- Hero Section -->
	<section class="hero">
		<div class="container">
			<h1 class="hero-headline">
				<span class="gradient-text">Enterprise Solutions</span>
			</h1>
			<p class="hero-subheadline">
				Transforming complex challenges into elegant solutions
			</p>
			<p class="hero-description">
				We partner with industry leaders to architect, build, and scale solutions that drive real business impact.
			</p>
		</div>
	</section>

	<!-- Featured Case Studies -->
	<section class="case-studies-section">
		<div class="container">
			<h2 class="section-heading">Featured Transformations</h2>
			<p class="section-description">
				In-depth explorations of our most impactful client partnerships
			</p>

			<div class="case-studies-grid">
				{#each deepCaseStudies as study}
					<a href="/work/{study.slug}" class="case-study-card featured">
						<div class="card-content">
							{#if study.image}
								<div class="company-logo">
									<img src={study.image} alt={study.company} />
								</div>
							{:else}
								<div class="company-badge">{study.company}</div>
							{/if}
							<h3 class="work-title">{study.title}</h3>
							<p class="work-description">{study.description}</p>
							<div class="tags">
								{#each study.tags as tag}
									<span class="pill">{tag}</span>
								{/each}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Additional Client Work -->
	<section class="additional-work-section">
		<div class="container">
			<h2 class="section-heading">Additional Client Work</h2>
			<p class="section-description">
				More enterprise solutions and transformations
			</p>

			<div class="work-grid">
				{#each lightweightCaseStudies as study}
					<div class="work-card">
						<div class="card-content">
							{#if study.image}
								<div class="company-logo small">
									<img src={study.image} alt={study.company} />
								</div>
							{:else}
								<div class="company-badge small">{study.company}</div>
							{/if}
							<h3 class="work-title">{study.title}</h3>
							<p class="work-description">{study.description}</p>
							<div class="tags">
								{#each study.tags as tag}
									<span class="pill">{tag}</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="final-cta">
		<div class="container">
			<h2 class="cta-heading">Ready to transform your vision into reality?</h2>
			<p class="cta-description">
				Let's discuss how we can help you build solutions that scale.
			</p>
			<a href="/contact" class="cta-button">
				Start a Conversation
			</a>
		</div>
	</section>
</main>

<style>
	.work-page {
		background: var(--white);
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--pink), var(--purple), var(--orange));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Case Studies Section */
	.case-studies-section {
		padding: 60px 0;
		background: var(--white);
	}

	.additional-work-section {
		padding: 60px 0;
		background: var(--gray-100);
	}

	.case-studies-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 32px;
		margin-top: 48px;
		justify-items: center;
	}

	.work-grid {
		display: flex;
		gap: 24px;
		margin-top: 48px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 20px;
	}

	.work-grid::-webkit-scrollbar {
		height: 8px;
	}

	.work-grid::-webkit-scrollbar-track {
		background: var(--gray-200);
		border-radius: 4px;
	}

	.work-grid::-webkit-scrollbar-thumb {
		background: linear-gradient(135deg, var(--pink), var(--purple));
		border-radius: 4px;
	}

	.case-study-card,
	.work-card {
		background: var(--white);
		border: 1px solid var(--gray-400);
		border-radius: 12px;
		padding: 32px;
		text-decoration: none;
		transition: all 0.3s ease;
		display: block;
		position: relative;
		overflow: hidden;
		width: 100%;
		max-width: 500px;
	}

	.case-study-card {
		cursor: pointer;
	}

	.work-card {
		cursor: default;
		flex: 0 0 350px;
		scroll-snap-align: start;
	}

	.card-content {
		position: relative;
		z-index: 1;
	}

	.case-study-card.featured {
		border: 2px solid transparent;
		background: linear-gradient(var(--white), var(--white)) padding-box,
		            linear-gradient(135deg, var(--pink), var(--purple)) border-box;
	}

	.case-study-card:hover,
	.work-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
	}

	.company-badge {
		display: inline-block;
		padding: 8px 16px;
		background: linear-gradient(135deg, var(--pink), var(--purple));
		color: var(--white);
		border-radius: 6px;
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 16px;
	}

	.company-badge.small {
		font-size: 12px;
		padding: 6px 12px;
	}

	.company-logo {
		height: 60px;
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.company-logo.small {
		height: 40px;
		margin-bottom: 16px;
	}

	.company-logo img {
		max-height: 100%;
		max-width: 200px;
		width: auto;
		object-fit: contain;
	}

	.company-logo.small img {
		max-width: 150px;
	}

	.work-description {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(26, 26, 26, 0.95);
		color: var(--white);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 32px;
		text-align: center;
		opacity: 0;
		transition: all 0.3s ease;
		z-index: 2;
		border-radius: 12px;
		font-size: 16px;
		line-height: 1.6;
	}

	.case-study-card:hover .work-description,
	.work-card:hover .work-description {
		opacity: 1;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 16px;
		max-height: 64px;
		overflow: hidden;
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

	/* Dark mode support */
	:global(html[data-theme="dark"]) .work-page,
	:global(html[data-theme="dark"]) .case-studies-section {
		background: #0a0a0a !important;
	}

	:global(html[data-theme="dark"]) .additional-work-section {
		background: #1a1a1a !important;
	}

	:global(html[data-theme="dark"]) .case-study-card,
	:global(html[data-theme="dark"]) .work-card {
		background: #1a1a1a !important;
		border-color: #333 !important;
	}

	:global(html[data-theme="dark"]) .case-study-card.featured {
		background: linear-gradient(#1a1a1a, #1a1a1a) padding-box,
		            linear-gradient(135deg, var(--pink), var(--purple)) border-box !important;
	}

	/* Logo visibility in dark mode */
	:global(html[data-theme="dark"]) .company-logo img {
		filter: brightness(0) invert(1) !important;
	}

	:global(html[data-theme="dark"]) .work-description {
		background: rgba(10, 10, 10, 0.95) !important;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.case-studies-section,
		.additional-work-section {
			padding: 40px 0;
		}

		.case-studies-grid {
			grid-template-columns: 1fr;
			gap: 20px;
			justify-items: center;
		}

		.case-study-card,
		.work-card {
			padding: 24px;
			width: 100%;
			max-width: 100%;
		}

		.work-card {
			flex: 0 0 280px;
		}

		.work-title {
			font-size: 18px;
		}

		.company-logo {
			height: 50px;
			margin-bottom: 16px;
		}

		.cta-heading {
			font-size: 32px;
		}

		.tags {
			gap: 6px;
			margin-top: 12px;
		}
	}
</style>
