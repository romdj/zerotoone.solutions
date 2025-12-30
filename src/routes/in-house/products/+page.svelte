<script lang="ts">
	import '$lib/styles/homepage.css';

	const techStack = [
		{ category: 'Cloud Platforms', items: ['AWS', 'Azure', 'GCP', 'Multi-Cloud Architecture'] },
		{ category: 'Languages', items: ['Python', 'TypeScript', 'Java', 'Scala', 'Node.js', '.NET', 'Go'] },
		{ category: 'Architecture', items: ['Event-Driven', 'Microservices', 'Serverless', 'KAPPA', 'CQRS', 'Domain-Driven Design'] },
		{ category: 'Data Engineering', items: ['Snowflake', 'Databricks', 'Spark', 'Data Lakes', 'Real-Time Streams', 'ETL/ELT'] },
		{ category: 'Infrastructure', items: ['Kubernetes', 'Docker', 'Terraform', 'CloudFormation', 'CI/CD', 'GitOps'] }
	];

	const domainExpertise = [
		{ domain: 'Healthcare', capabilities: ['FHIR Compliance', 'IEC 62304', 'Medical Devices', 'PHI Security', 'FDA Regulations'] },
		{ domain: 'Supply Chain', capabilities: ['SAP S4/HANA', 'Global Logistics', 'Inventory Management', 'Real-Time Tracking'] },
		{ domain: 'Energy & Infrastructure', capabilities: ['Grid Operations', 'Market Mechanisms', 'IoT at Scale', 'Critical Systems'] },
		{ domain: 'Financial Services', capabilities: ['Payment Systems', 'Regulatory Compliance', 'High-Frequency Trading', 'Security'] },
		{ domain: 'Retail & E-Commerce', capabilities: ['Product Catalogs', 'Order Management', 'Personalization', 'Analytics'] }
	];

	const deliveryCapabilities = [
		{ phase: 'Discovery', activities: ['Problem Framing', 'User Research', 'Market Analysis', 'Technical Feasibility'] },
		{ phase: 'Strategy', activities: ['Architecture Design', 'Technology Selection', 'Roadmap Planning', 'Risk Assessment'] },
		{ phase: 'Execution', activities: ['Agile Development', 'Team Leadership', 'Stakeholder Management', 'Quality Assurance'] },
		{ phase: 'Scale', activities: ['Performance Optimization', 'Infrastructure Scaling', 'Process Automation', 'Team Growth'] },
		{ phase: 'Venture', activities: ['Business Model Design', 'Go-to-Market Strategy', 'Fundraising Support', 'Board Advisory'] }
	];
</script>

<svelte:head>
	<title>Products - From Idea to Market | Zero to One Solutions</title>
	<meta name="description" content="We turn your vision into venture-ready products. Full-stack development, business architecture, and the leadership to reach the three commas club." />
</svelte:head>

<main class="in-house-page">
	<!-- Hero Section - No slogan, just the hook -->
	<section class="hero">
		<div class="container">
			<h1 class="hero-headline">
				You Have the Vision
			</h1>
			<p class="hero-subheadline">
				You see the market gap. You know the problem intimately. You've sketched the solution on napkins, whiteboards, late-night notes.
			</p>
			<p class="hero-description">
				What you need isn't another consultant telling you what to build. You need a partner who can architect it, code it, ship it—and help you turn it into a venture that scales.
			</p>
		</div>
	</section>

	<!-- The Reader's Journey -->
	<section class="reader-journey">
		<div class="container">
			<h2 class="section-heading">Where You Are Right Now</h2>

			<div class="journey-scenarios">
				<div class="scenario">
					<h3>The Founder with an Idea</h3>
					<p>
						You know your industry inside-out. You've identified a problem worth billions. You can describe the solution—but you're not a technical co-founder. You need someone who can translate your vision into architecture, into code, into a product users will pay for.
					</p>
					<p class="insight">
						<strong>What we bring:</strong> The technical co-founder skillset without the equity split. We architect, build, and deploy your MVP—then help you hire and scale the team that takes it further.
					</p>
				</div>

				<div class="scenario">
					<h3>The Exec with a Moonshot</h3>
					<p>
						You're inside a corporation that moves slowly. You see the opportunity—a new product line, a platform play, a venture spinout. You have budget, you have mandate, but corporate IT can't move fast enough.
					</p>
					<p class="insight">
						<strong>What we bring:</strong> Venture velocity with enterprise rigor. We build like a startup (weeks, not quarters) while maintaining the compliance, security, and integration your organization requires.
					</p>
				</div>

				<div class="scenario">
					<h3>The Team Ready to Scale</h3>
					<p>
						You've built the product. You've found product-market fit. Now you need to scale—10x users, 100x data, global operations. Your current architecture is buckling. Your team is firefighting.
					</p>
					<p class="insight">
						<strong>What we bring:</strong> Platform thinking at scale. We've built systems processing millions of events daily for Nike, managed device fleets for Philips, architected infrastructure for national energy grids. We know the patterns, the pitfalls, the proven paths.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Design Thinking & Collaboration -->
	<section class="collaboration-approach">
		<div class="container">
			<h2 class="section-heading">How We Work Together</h2>
			<p class="section-description">
				This isn't a vendor relationship. This is partnership. Here's what collaboration looks like:
			</p>

			<div class="collaboration-phases">
				<div class="phase">
					<div class="phase-number">01</div>
					<h3>Discovery & Framing</h3>
					<p><strong>You bring:</strong> Domain expertise, user insights, business context</p>
					<p><strong>We bring:</strong> Technical feasibility analysis, architecture options, risk assessment</p>
					<p><strong>Together we:</strong> Define what success looks like, identify the critical path, align on trade-offs</p>
				</div>

				<div class="phase">
					<div class="phase-number">02</div>
					<h3>Architecture & Strategy</h3>
					<p><strong>You bring:</strong> Product vision, feature priorities, go-to-market timeline</p>
					<p><strong>We bring:</strong> System design, technology selection, implementation roadmap</p>
					<p><strong>Together we:</strong> Balance speed vs. scalability, build vs. buy, now vs. later</p>
				</div>

				<div class="phase">
					<div class="phase-number">03</div>
					<h3>Build & Iterate</h3>
					<p><strong>You bring:</strong> User feedback, market signals, strategic pivots</p>
					<p><strong>We bring:</strong> Working software weekly, quality standards, technical mentorship</p>
					<p><strong>Together we:</strong> Ship fast, learn faster, adapt continuously</p>
				</div>

				<div class="phase">
					<div class="phase-number">04</div>
					<h3>Scale & Transition</h3>
					<p><strong>You bring:</strong> Team hires, growth capital, market traction</p>
					<p><strong>We bring:</strong> Architecture that scales, team training, operational playbooks</p>
					<p><strong>Together we:</strong> Build the foundation for 10x, 100x, 1000x growth</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Full Stack of Expertise -->
	<section class="expertise-stack">
		<div class="container">
			<h2 class="section-heading">The Full Stack</h2>
			<p class="section-description">
				We don't just write code. We architect businesses. Here's the complete toolkit:
			</p>

			<div class="expertise-grid">
				<!-- Technical Stack -->
				<div class="expertise-category">
					<h3>Technical Mastery</h3>
					{#each techStack as stack}
						<div class="stack-group">
							<h4>{stack.category}</h4>
							<div class="stack-items">
								{#each stack.items as item}
									<span class="tech-pill">{item}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<!-- Domain Expertise -->
				<div class="expertise-category">
					<h3>Domain Knowledge</h3>
					{#each domainExpertise as domain}
						<div class="domain-group">
							<h4>{domain.domain}</h4>
							<ul>
								{#each domain.capabilities as capability}
									<li>{capability}</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>

				<!-- Delivery Capabilities -->
				<div class="expertise-category full-width">
					<h3>End-to-End Delivery</h3>
					<div class="delivery-pipeline">
						{#each deliveryCapabilities as capability}
							<div class="delivery-phase">
								<h4>{capability.phase}</h4>
								<ul>
									{#each capability.activities as activity}
										<li>{activity}</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- From Product to Venture -->
	<section class="product-to-venture">
		<div class="container">
			<h2 class="section-heading">From Product to Venture</h2>
			<p class="section-description">
				Building software is one thing. Building a business is another. We do both.
			</p>

			<div class="venture-journey">
				<div class="venture-stage">
					<h3>Idea → Product</h3>
					<p><strong>What we build:</strong></p>
					<ul>
						<li>MVP that validates core hypothesis</li>
						<li>Technical architecture that scales</li>
						<li>Product roadmap aligned with market</li>
						<li>Quality standards from day one (TDD, CI/CD)</li>
					</ul>
					<p class="stage-outcome">Outcome: Deployable product, validated with users</p>
				</div>

				<div class="venture-arrow">→</div>

				<div class="venture-stage">
					<h3>Product → Scale</h3>
					<p><strong>What we enable:</strong></p>
					<ul>
						<li>Platform thinking (not just features)</li>
						<li>Infrastructure that handles 100x growth</li>
						<li>Team processes that maintain velocity</li>
						<li>Operational excellence (monitoring, security, compliance)</li>
					</ul>
					<p class="stage-outcome">Outcome: Enterprise-grade platform, scalable operations</p>
				</div>

				<div class="venture-arrow">→</div>

				<div class="venture-stage">
					<h3>Scale → Venture</h3>
					<p><strong>What we contribute:</strong></p>
					<ul>
						<li>Business architecture & unit economics</li>
						<li>Go-to-market technical strategy</li>
						<li>Investor-ready technology story</li>
						<li>Leadership team building</li>
					</ul>
					<p class="stage-outcome">Outcome: Fundable venture, path to profitability</p>
				</div>
			</div>

			<div class="highlight-box">
				<h3>The Three Commas Club</h3>
				<p>
					Getting to $1B isn't just about great technology. It's about business architecture—understanding market dynamics, competitive moats, network effects, unit economics. It's about leadership—building teams, managing boards, navigating pivots.
				</p>
				<p>
					We've led teams of 12+ through enterprise transformations. We've architected platforms processing millions of daily transactions. We've designed systems for Nike, IBM, Philips—companies that play at scale.
				</p>
				<p>
					<strong>We bring the full stack: technical excellence + business acumen + proven leadership.</strong>
				</p>
			</div>
		</div>
	</section>

	<!-- Case Examples -->
	<section class="case-examples">
		<div class="container">
			<h2 class="section-heading">We've Done This Before</h2>

			<div class="examples-grid">
				<div class="example-card">
					<h3>Nike Supply Chain Platform</h3>
					<p class="example-scope">From idea to millions of events daily</p>
					<p>
						Architected and built event-driven platform from scratch. Led team of 12. Integrated SAP, logistics partners, data lakes. Launched in 12 months.
					</p>
					<a href="/work/nike" class="example-link">Read the story →</a>
				</div>

				<div class="example-card">
					<h3>Philips Healthcare Platform</h3>
					<p class="example-scope">From prototype to global deployment</p>
					<p>
						Built IoT platform managing thousands of medical devices. FHIR-compliant, IEC 62304 certified. From development to production across healthcare providers worldwide.
					</p>
					<a href="/work/philips" class="example-link">Read the story →</a>
				</div>

				<div class="example-card">
					<h3>Elia Grid Modernization</h3>
					<p class="example-scope">From legacy to cloud-native</p>
					<p>
						Led enterprise architecture transformation for national energy infrastructure. Established standards, modernized 3 platforms, enabled Belgium's energy transition.
					</p>
					<a href="/work/elia" class="example-link">Read the story →</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Final CTA with Slogan -->
	<section class="final-cta-inhouse">
		<div class="container">
			<h2>You Bring the Vision</h2>
			<p class="cta-detail">
				We bring the architecture. The code. The platform thinking. The business acumen. The leadership that scales.
			</p>
			<p class="cta-detail">
				From idea to product. From product to venture.
			</p>

			<div class="slogan">
				<p class="slogan-text">Creating Tomorrow, Today.</p>
			</div>

			<a href="/contact" class="cta-button-large">Let's Build Together</a>
		</div>
	</section>
</main>

<style>
	.in-house-page {
		background: var(--white);
	}

	/* Hero */
	.hero {
		padding: 120px 0 80px;
		text-align: center;
	}

	.hero-headline {
		font-size: 56px;
		font-weight: 700;
		margin: 0 0 24px 0;
		color: var(--ink);
	}

	.hero-subheadline {
		font-size: 24px;
		line-height: 1.5;
		color: var(--gray-600);
		margin: 0 0 16px 0;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-description {
		font-size: 20px;
		line-height: 1.6;
		color: var(--gray-600);
		max-width: 700px;
		margin: 0 auto;
	}

	/* Reader Journey */
	.reader-journey {
		padding: 80px 0;
		background: var(--gray-100);
	}

	.journey-scenarios {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 32px;
		margin-top: 48px;
	}

	.scenario {
		background: var(--white);
		padding: 32px;
		border-radius: 8px;
		border: 1px solid var(--gray-400);
	}

	.scenario h3 {
		font-size: 24px;
		font-weight: 600;
		margin: 0 0 16px 0;
		color: var(--ink);
	}

	.scenario p {
		font-size: 16px;
		line-height: 1.7;
		color: var(--gray-600);
		margin: 0 0 16px 0;
	}

	.insight {
		background: var(--gray-100);
		padding: 16px;
		border-left: 3px solid var(--pink);
		border-radius: 4px;
	}

	.insight strong {
		color: var(--pink);
	}

	/* Collaboration Approach */
	.collaboration-approach {
		padding: 80px 0;
	}

	.collaboration-phases {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 32px;
		margin-top: 48px;
	}

	.phase {
		position: relative;
		padding: 32px;
		background: var(--gray-100);
		border-radius: 8px;
	}

	.phase-number {
		position: absolute;
		top: -16px;
		left: 32px;
		background: linear-gradient(135deg, var(--pink), var(--purple));
		color: var(--white);
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		font-weight: 700;
	}

	.phase h3 {
		font-size: 20px;
		font-weight: 600;
		margin: 8px 0 16px 0;
		color: var(--ink);
	}

	.phase p {
		font-size: 15px;
		line-height: 1.6;
		color: var(--gray-600);
		margin: 0 0 12px 0;
	}

	.phase p strong {
		color: var(--ink);
	}

	/* Expertise Stack */
	.expertise-stack {
		padding: 80px 0;
		background: var(--gray-100);
	}

	.expertise-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 48px;
		margin-top: 48px;
	}

	.expertise-category.full-width {
		grid-column: 1 / -1;
	}

	.expertise-category h3 {
		font-size: 28px;
		font-weight: 700;
		margin: 0 0 24px 0;
		color: var(--ink);
	}

	.stack-group, .domain-group {
		margin-bottom: 24px;
	}

	.stack-group h4, .domain-group h4 {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 12px 0;
		color: var(--ink);
	}

	.stack-items {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tech-pill {
		background: var(--white);
		border: 1px solid var(--gray-400);
		padding: 6px 12px;
		border-radius: 16px;
		font-size: 14px;
		color: var(--gray-600);
	}

	.domain-group ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.domain-group li {
		font-size: 15px;
		color: var(--gray-600);
		padding: 4px 0;
	}

	.delivery-pipeline {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 24px;
	}

	.delivery-phase h4 {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 12px 0;
		color: var(--pink);
	}

	.delivery-phase ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.delivery-phase li {
		font-size: 14px;
		color: var(--gray-600);
		padding: 4px 0;
	}

	/* Product to Venture */
	.product-to-venture {
		padding: 80px 0;
	}

	.venture-journey {
		display: flex;
		align-items: center;
		gap: 24px;
		margin: 48px 0;
		flex-wrap: wrap;
		justify-content: center;
	}

	.venture-stage {
		flex: 1;
		min-width: 280px;
		max-width: 350px;
		background: var(--gray-100);
		padding: 32px;
		border-radius: 8px;
	}

	.venture-stage h3 {
		font-size: 24px;
		font-weight: 700;
		margin: 0 0 16px 0;
		background: linear-gradient(135deg, var(--pink), var(--purple));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.venture-stage p {
		font-size: 15px;
		line-height: 1.6;
		color: var(--gray-600);
		margin: 0 0 12px 0;
	}

	.venture-stage p strong {
		color: var(--ink);
		display: block;
		margin-bottom: 8px;
	}

	.venture-stage ul {
		margin: 12px 0;
		padding-left: 20px;
	}

	.venture-stage li {
		font-size: 14px;
		line-height: 1.6;
		color: var(--gray-600);
		margin-bottom: 8px;
	}

	.stage-outcome {
		margin-top: 16px;
		padding: 12px;
		background: var(--white);
		border-left: 3px solid var(--pink);
		border-radius: 4px;
		font-weight: 600;
		color: var(--ink) !important;
	}

	.venture-arrow {
		font-size: 48px;
		color: var(--pink);
		font-weight: 700;
		flex-shrink: 0;
	}

	.highlight-box {
		background: linear-gradient(135deg, rgba(241, 23, 89, 0.1), rgba(131, 51, 197, 0.1));
		border: 2px solid var(--pink);
		border-radius: 8px;
		padding: 32px;
		margin-top: 48px;
	}

	.highlight-box h3 {
		font-size: 28px;
		font-weight: 700;
		margin: 0 0 16px 0;
		color: var(--ink);
	}

	.highlight-box p {
		font-size: 16px;
		line-height: 1.7;
		color: var(--gray-600);
		margin: 0 0 16px 0;
	}

	.highlight-box p:last-child {
		margin-bottom: 0;
	}

	/* Case Examples */
	.case-examples {
		padding: 80px 0;
		background: var(--gray-100);
	}

	.examples-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 32px;
		margin-top: 48px;
	}

	.example-card {
		background: var(--white);
		padding: 32px;
		border-radius: 8px;
		border: 1px solid var(--gray-400);
		transition: all 0.3s ease;
	}

	.example-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
	}

	.example-card h3 {
		font-size: 22px;
		font-weight: 700;
		margin: 0 0 8px 0;
		color: var(--ink);
	}

	.example-scope {
		font-size: 14px;
		color: var(--pink);
		font-weight: 600;
		margin: 0 0 16px 0 !important;
	}

	.example-card p {
		font-size: 15px;
		line-height: 1.6;
		color: var(--gray-600);
		margin: 0 0 16px 0;
	}

	.example-link {
		color: var(--pink);
		text-decoration: none;
		font-weight: 600;
		font-size: 15px;
		transition: opacity 0.2s;
	}

	.example-link:hover {
		opacity: 0.8;
	}

	/* Final CTA */
	.final-cta-inhouse {
		padding: 120px 0;
		background: linear-gradient(135deg, var(--pink), var(--purple), var(--orange));
		text-align: center;
		color: var(--white);
	}

	.final-cta-inhouse h2 {
		font-size: 48px;
		font-weight: 700;
		margin: 0 0 24px 0;
		color: var(--white);
	}

	.cta-detail {
		font-size: 20px;
		line-height: 1.6;
		margin: 0 0 16px 0;
		color: rgba(255, 255, 255, 0.95);
	}

	.slogan {
		margin: 48px 0;
		padding: 32px 0;
		border-top: 2px solid rgba(255, 255, 255, 0.3);
		border-bottom: 2px solid rgba(255, 255, 255, 0.3);
	}

	.slogan-text {
		font-size: 36px;
		font-weight: 700;
		font-style: italic;
		margin: 0;
		color: var(--white);
	}

	.cta-button-large {
		display: inline-block;
		padding: 20px 48px;
		background: var(--white);
		color: var(--pink);
		border-radius: 8px;
		text-decoration: none;
		font-weight: 700;
		font-size: 20px;
		transition: all 0.3s ease;
		margin-top: 32px;
	}

	.cta-button-large:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
	}

	/* Dark mode */
	:global(html[data-theme="dark"]) .in-house-page {
		background: #0a0a0a;
	}

	:global(html[data-theme="dark"]) .reader-journey,
	:global(html[data-theme="dark"]) .expertise-stack,
	:global(html[data-theme="dark"]) .case-examples {
		background: #1a1a1a;
	}

	:global(html[data-theme="dark"]) .scenario,
	:global(html[data-theme="dark"]) .example-card {
		background: #0a0a0a;
		border-color: #333;
	}

	:global(html[data-theme="dark"]) .phase,
	:global(html[data-theme="dark"]) .venture-stage,
	:global(html[data-theme="dark"]) .insight {
		background: #0a0a0a;
	}

	:global(html[data-theme="dark"]) .tech-pill {
		background: #1a1a1a;
		border-color: #333;
	}

	:global(html[data-theme="dark"]) .stage-outcome {
		background: #1a1a1a;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-headline {
			font-size: 36px;
		}

		.hero-subheadline {
			font-size: 18px;
		}

		.expertise-grid {
			grid-template-columns: 1fr;
		}

		.venture-journey {
			flex-direction: column;
		}

		.venture-arrow {
			transform: rotate(90deg);
		}

		.slogan-text {
			font-size: 28px;
		}

		.final-cta-inhouse h2 {
			font-size: 32px;
		}
	}
</style>
