<script lang="ts">
	import CaseStudyLayout from '$lib/components/CaseStudyLayout.svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		// Nike uses Helvetica Neue as primary font (system font fallback)
		// No external fonts needed - using system fonts
	});
</script>

<svelte:head>
	<title>Nike - Supply Chain Execution Platform (Corporate Brand) | Zero to One Solutions</title>
	<meta name="description" content="Architected, designed, and built cloud-native platform processing millions of supply chain events daily across Nike's global operations." />
</svelte:head>

<div class="nike-corporate">
	<CaseStudyLayout
		company="Nike"
		logo="/logos/nike-swoosh-logo-paint-cropped.png"
		title="Supply Chain Execution Platform"
		role="Technical Architect"
		tags={['Event-Driven Architecture', 'Supply Chain', 'AWS', 'Team Leadership', 'SAP S4/HANA', 'KAPPA Architecture']}
		headerImage={data.headerImage}
	>
		<!-- Nike's Purpose: Moving the World Forward -->
		<section>
			<h2>Moving the World Forward Through Technology</h2>
			<p>
				At Nike, our purpose is to <strong>move the world forward through the power of sport</strong>. Our mission is to bring inspiration and innovation to every athlete in the world—and if you have a body, you are an athlete.
			</p>
			<p>
				Sport moves us forward. It always has, and it always will. Technology enables that movement. This supply chain execution platform embodies that purpose: building systems that help Nike deliver innovation faster, serve athletes better, and create a more sustainable future for sport and our planet.
			</p>

			<div class="highlight-box purpose-box">
				<p><strong>Nike's Three Purpose Pillars:</strong></p>
				<ul>
					<li><strong>People:</strong> Unlocking human potential through the power of sport and our culture of innovation</li>
					<li><strong>Planet:</strong> Protecting the future of sport by minimizing our environmental impact</li>
					<li><strong>Play:</strong> Expanding access to sport for the next generation of athletes</li>
				</ul>
			</div>

			<p>
				This platform serves all three pillars. By modernizing Nike's supply chain architecture, we enable faster innovation cycles (People), optimize logistics to reduce environmental impact (Planet), and ensure products reach athletes worldwide with speed and reliability (Play).
			</p>

			<p>
				What follows is the technical story of how we built that platform—with boldness and humility, listening and learning, always working in progress. Because at Nike, we believe in moving forward, not standing still.
			</p>
		</section>

		<!-- The Architectural Challenge -->
		<section>
			<h2>The Architectural Challenge</h2>
			<p>
				Nike's supply chain generated millions of events daily—products manufactured across continents, shipped through logistics partners, stored in warehouses, and delivered to customers. Each event held critical data. But the architecture couldn't see them.
			</p>
			<p>
				The existing system was a classic enterprise integration pattern: batch-oriented, eventually consistent, and fundamentally opaque. SAP S4/HANA managed orders. Blue Yonder controlled warehouses. Centiro orchestrated transport. Each system maintained its own view of reality, synced through nightly batch jobs and point-to-point integrations.
			</p>

			<div class="highlight-box">
				<p><strong>The Core Technical Problems:</strong></p>
				<ul>
					<li><strong>Event Blindness:</strong> Real-time events were captured but immediately reduced to state updates. The event stream—the actual history of what happened—was lost.</li>
					<li><strong>Integration Complexity:</strong> N-squared problem. Each new system required integrations with every existing system.</li>
					<li><strong>Data Consistency:</strong> Without a single source of truth, reconciliation was constant and manual.</li>
					<li><strong>Scalability Ceiling:</strong> Batch windows shrinking as data volume grew. Real-time requirements impossible with batch architecture.</li>
				</ul>
			</div>

			<p>
				The technical constraint that made this interesting: we couldn't stop the business. Zero downtime. Full backward compatibility. Gradual migration while processing millions of production events daily.
			</p>
		</section>

		<!-- The Design Space -->
		<section>
			<h2>The Design Space</h2>
			<p>
				We evaluated three fundamental architectural approaches:
			</p>

			<h3>Option 1: Lambda Architecture</h3>
			<p><strong>Batch + Stream Layers with Serving Layer</strong></p>
			<ul>
				<li><strong>Pros:</strong> Industry standard. Proven at scale. Handles both batch and real-time.</li>
				<li><strong>Cons:</strong> Code duplication between batch and stream. Complexity in maintaining two pipelines. Eventual consistency between layers.</li>
				<li><strong>Why we rejected it:</strong> Operational complexity. Every feature needed implementing twice. Team velocity would suffer.</li>
			</ul>

			<h3>Option 2: Microservices with Event Sourcing</h3>
			<p><strong>Domain-driven services, each with event store</strong></p>
			<ul>
				<li><strong>Pros:</strong> Clean domain boundaries. Event sourcing gives full history. Microservices match org structure.</li>
				<li><strong>Cons:</strong> Distributed data management complexity. Event schema evolution challenges. Cross-service queries difficult.</li>
				<li><strong>Why we rejected it:</strong> Nike's architecture office was moving toward platform thinking, not proliferating microservices.</li>
			</ul>

			<h3>Option 3: KAPPA Architecture</h3>
			<p><strong>Stream-first, with reprocessing instead of batch layer</strong></p>
			<ul>
				<li><strong>Pros:</strong> Single pipeline for all data. Event stream as source of truth. Reprocessing enables corrections and new features.</li>
				<li><strong>Cons:</strong> Less mature pattern. Requires sophisticated stream processing. Schema evolution critical.</li>
				<li><strong>Why we chose it:</strong> Aligned with event-driven mandate. Simpler operational model. Could evolve incrementally.</li>
			</ul>

			<div class="highlight-box">
				<p><strong>The Technical Bet:</strong> We believed the operational simplicity of a single pipeline would outweigh the maturity risk of KAPPA architecture. We were betting that stream processing technology (AWS Lambda, Kinesis, EventBridge) had matured enough to handle Nike's scale.</p>
			</div>
		</section>

		<!-- The Key Decision -->
		<section>
			<h2>The Key Decision: Event Stream as Source of Truth</h2>
			<p>
				The architecture hinged on one fundamental choice: <strong>the event stream is the source of truth, not derived state</strong>.
			</p>

			<h3>What This Meant Technically</h3>
			<p>
				Every supply chain activity became an immutable event in a central stream:
			</p>
			<ul>
				<li><code>OrderCreated</code> from SAP S4/HANA</li>
				<li><code>ShipmentDispatched</code> from Centiro</li>
				<li><code>InventoryReceived</code> from Blue Yonder</li>
				<li><code>QualityInspectionCompleted</code> from manufacturing systems</li>
			</ul>

			<h3>Event Schema Design</h3>
			<p>
				We chose AVRO for event serialization:
			</p>
			<ul>
				<li><strong>Schema evolution:</strong> Forward and backward compatibility required for gradual rollout</li>
				<li><strong>Schema registry:</strong> Centralized in AWS, versioned, enforced at produce and consume time</li>
				<li><strong>Naming conventions:</strong> <code>nike.supplychain.[domain].[event].v[version]</code></li>
			</ul>

			<h3>The Trade-offs We Accepted</h3>
			<p><strong>What we gave up:</strong></p>
			<ul>
				<li><strong>Immediate consistency:</strong> Embraced eventual consistency across systems</li>
				<li><strong>Simple queries:</strong> Current state requires stream processing, not simple database SELECT</li>
				<li><strong>Traditional ops model:</strong> Monitoring shifted from database metrics to stream health</li>
			</ul>

			<p><strong>What we enabled:</strong></p>
			<ul>
				<li><strong>Complete history:</strong> Can answer "what happened" not just "what is the current state"</li>
				<li><strong>Reprocessing:</strong> Fix data bugs retroactively, add new features by replaying events</li>
				<li><strong>Real-time analytics:</strong> Business intelligence on live stream, not stale batch data</li>
				<li><strong>Event-driven integrations:</strong> New systems consume events, don't need point-to-point integrations</li>
			</ul>
		</section>

		<!-- Implementation Reality -->
		<section>
			<h2>Implementation Reality</h2>
			<p>
				Theory meets practice. Here's what actually happened during the build:
			</p>

			<h3>Challenge 1: Schema Evolution in Production</h3>
			<p>
				Three months in, SAP changed their order structure. We needed backward compatibility with events already in the stream.
			</p>
			<p><strong>Solution:</strong> AVRO schema evolution with default values. Old events processed with defaults for new fields. New consumers handled both schemas. Migration window: 6 weeks of parallel support.</p>

			<h3>Challenge 2: Event Ordering at Scale</h3>
			<p>
				Distributed systems don't guarantee order. But supply chain has sequencing requirements: can't ship before receiving inventory.
			</p>
			<p><strong>Solution:</strong> Partition key based on entity ID (order ID, product ID). Within partition, ordering guaranteed. Cross-partition, idempotent processing with versioning.</p>

			<h3>Challenge 3: Poison Pills</h3>
			<p>
				Malformed events from legacy systems would block stream processing, backing up millions of events behind them.
			</p>
			<p><strong>Solution:</strong> Dead letter queue pattern. Failed events routed to DLQ, main stream continues. Async analysis and replay of DLQ. Alerting on DLQ depth spike.</p>

			<h3>Challenge 4: Cost Explosion</h3>
			<p>
				Initial design had Lambda functions for every event type. At millions of events daily, cost projections were unsustainable.
			</p>
			<p><strong>Solution:</strong> Event batching in EventBridge. Step Functions for orchestration (cheaper than Lambda for long-running processes). S3 tiering for historical events (cold storage after 90 days).</p>

			<h3>The Technical Debt We Managed</h3>
			<ul>
				<li><strong>Snowflake sync latency:</strong> Started with 15-minute lag. Business wanted 5 minutes. Optimized to 7 minutes (good enough).</li>
				<li><strong>Monitoring gaps:</strong> Stream health metrics took 2 months to mature. Early days were flying blind.</li>
				<li><strong>Testing challenges:</strong> Stream processing hard to unit test. Invested in contract testing and stream replay testing.</li>
			</ul>
		</section>

		<!-- Building for Athletes, By Athletes -->
		<section>
			<h2>Building for Athletes, By Athletes</h2>
			<p>
				At Nike, we believe that if you have a body, you are an athlete. That philosophy extends to how we build technology. This platform wasn't created by architects in isolation—it was built by a diverse, global team bringing different perspectives, backgrounds, and expertise.
			</p>

			<h3>The Team Behind the Platform</h3>
			<ul>
				<li><strong>Global collaboration:</strong> Engineers across Portland, Amsterdam, and Shanghai working as one team</li>
				<li><strong>Cross-functional expertise:</strong> Supply chain domain experts, cloud architects, data engineers, and business analysts</li>
				<li><strong>Inclusive design:</strong> Accessibility and localization built into every architectural decision, not bolted on later</li>
				<li><strong>Knowledge sharing:</strong> Architecture decision records (ADRs), documentation, and tech talks ensuring everyone could contribute</li>
			</ul>

			<p>
				The platform's success came from listening, learning, and evolving together. When a Shanghai engineer raised concerns about latency for APAC regions, we adjusted the architecture. When warehouse operators in Memphis struggled with event visibility, we built better tooling. We moved forward by moving together.
			</p>
		</section>

		<!-- The System in Production -->
		<section>
			<h2>The System in Production</h2>
			<p>
				What the platform actually looks like running at Nike's scale:
			</p>

			<h3>Performance Metrics</h3>
			<ul>
				<li><strong>Event throughput:</strong> 3-5 million events per day (peak: 8 million during holiday season)</li>
				<li><strong>End-to-end latency:</strong> Event to Snowflake: p95 under 10 minutes</li>
				<li><strong>Processing time:</strong> Lambda cold start eliminated through reserved concurrency: p99 under 500ms</li>
				<li><strong>Availability:</strong> 99.95% (target was 99.9%)</li>
			</ul>

			<h3>Cost Profile</h3>
			<ul>
				<li><strong>Lambda:</strong> $12K/month (batch processing, orchestration)</li>
				<li><strong>EventBridge:</strong> $8K/month (event routing)</li>
				<li><strong>S3:</strong> $15K/month (event storage, 3-year retention)</li>
				<li><strong>Snowflake:</strong> $25K/month (analytics warehouse)</li>
				<li><strong>Total:</strong> ~$60K/month for global supply chain platform (less than single mainframe license we replaced)</li>
			</ul>

			<h3>Operational Lessons</h3>
			<p><strong>What surprised us:</strong></p>
			<ul>
				<li><strong>Schema evolution was harder than expected:</strong> Despite AVRO, coordinating consumer updates across teams took discipline</li>
				<li><strong>Monitoring was more important than we thought:</strong> Stream health requires different metrics than REST APIs</li>
				<li><strong>Event replay was more valuable than predicted:</strong> Used monthly for data corrections and new feature rollouts</li>
			</ul>

			<p><strong>What worked better than expected:</strong></p>
			<ul>
				<li><strong>Serverless scaling:</strong> Zero operational overhead during peak seasons. Just worked.</li>
				<li><strong>Event-driven integrations:</strong> New systems onboarded in days, not months</li>
				<li><strong>Real-time analytics:</strong> Business intelligence moved from "yesterday's data" to "what's happening now"</li>
			</ul>

			<div class="highlight-box">
				<h3>The Architecture's Future</h3>
				<p>
					Platform is now the template for other Nike domains. Three teams have adopted the pattern. Event schemas being standardized across company. The bet on KAPPA paid off—not just for supply chain, but as organizational capability.
				</p>
				<p>
					<strong>Next evolution:</strong> Machine learning models consuming event streams for predictive supply chain optimization. Real-time demand forecasting. Inventory rebalancing. All possible because events are the source of truth.
				</p>
			</div>
		</section>

		<!-- Technical Stack -->
		<section>
			<h2>Technology Choices & Why</h2>

			<div class="two-column">
				<div>
					<h3>Event Processing</h3>
					<ul>
						<li><strong>AWS EventBridge:</strong> Central event routing. Schema registry. Event replay.</li>
						<li><strong>AWS Lambda:</strong> Stateless processing. Auto-scaling. Cost-effective at scale.</li>
						<li><strong>Step Functions:</strong> Orchestration for complex workflows. Visual debugging.</li>
						<li><strong>AVRO:</strong> Schema evolution. Compact serialization. Multi-language support.</li>
					</ul>
				</div>
				<div>
					<h3>Data & Analytics</h3>
					<ul>
						<li><strong>Snowflake:</strong> Analytics warehouse. Separation of compute/storage. Time-travel queries.</li>
						<li><strong>Databricks:</strong> Stream processing for ML features. Spark for heavy transformations.</li>
						<li><strong>S3:</strong> Durable event storage. Lifecycle policies. Cost tiering.</li>
						<li><strong>Hackolade:</strong> Data modeling. Schema documentation. Team collaboration.</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- What We Would Do Differently -->
		<section>
			<h2>What We Would Do Differently</h2>
			<ul>
				<li><strong>Earlier investment in observability:</strong> Should have built comprehensive monitoring from day one, not month three</li>
				<li><strong>Contract testing from the start:</strong> Waiting until integration pain hit was mistake. Contract tests prevent schema breaks.</li>
				<li><strong>Cost monitoring per event type:</strong> Took months to understand which event types drove costs. Should have instrumented from launch.</li>
				<li><strong>Clearer schema governance:</strong> Schema changes need approval process. We learned this after breaking downstream consumers.</li>
				<li><strong>Better replay tooling:</strong> Event replay was manual initially. Should have automated replay testing and deployment.</li>
			</ul>
		</section>

		<!-- Principles Extracted -->
		<section>
			<h2>Architectural Principles That Emerged</h2>
			<p>
				Beyond Nike, these patterns apply to any event-driven platform at scale:
			</p>
			<ul>
				<li><strong>Events are data:</strong> Treat event schema with same rigor as database schema. Version. Govern. Test.</li>
				<li><strong>Idempotency is non-negotiable:</strong> Distributed systems will retry. Processing must be idempotent or you'll double-count.</li>
				<li><strong>Monitoring is different:</strong> Stream health ≠ REST API health. Lag, throughput, DLQ depth are your metrics.</li>
				<li><strong>Schema evolution is organizational:</strong> Technical solution (AVRO) is easy. Coordinating teams is hard. Governance matters.</li>
				<li><strong>Cost scales with carelessness:</strong> Event-driven architectures can explode costs if not monitored per-event-type.</li>
			</ul>
		</section>

		<!-- For the Next Generation -->
		<section>
			<h2>For the Next Generation</h2>
			<p>
				This platform represents more than technical architecture—it's infrastructure for Nike's future. As we continue to innovate for athletes, expand access to sport, and protect our planet, this system enables that mission at scale.
			</p>
			<p>
				The event stream now powers predictive analytics for inventory optimization, reducing waste. It enables faster product launches, getting innovation to athletes sooner. It provides transparency into our supply chain, supporting sustainability commitments. It's a work in progress, constantly evolving.
			</p>
			<p>
				<strong>Because sport moves us forward. Technology enables that movement. And together, we're building the future of Nike—for the next generation of athletes, on every continent, in every community.</strong>
			</p>
			<p>
				That's what purpose-driven architecture looks like. Not just solving technical problems, but moving the world forward.
			</p>
		</section>
	</CaseStudyLayout>
</div>

<style>
	/* Nike Corporate Brand Styling - Real Nike.com Design System */
	.nike-corporate {
		/* Nike's actual color palette - dark theme primary */
		--nike-bg-dark: #111111;
		--nike-text-primary: #111111;
		--nike-text-on-dark: #ffffff;
		--nike-text-secondary: #808080;
		--nike-text-tertiary: #999999;
		--nike-border: #e5e5e5;
		--nike-border-strong: #cccccc;
		--nike-bg-light: #ffffff;
		--nike-bg-tertiary: #f5f5f5;

		/* Spacing from Nike's grid system */
		--nike-spacing-xs: 16px;
		--nike-spacing-sm: 20px;
		--nike-spacing-md: 32px;
		--nike-spacing-lg: 40px;
		--nike-spacing-xl: 60px;
	}

	/* Typography - Helvetica Neue (Nike's primary font) */
	.nike-corporate :global(.case-content) {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: 400;
		line-height: 1.75;
	}

	/* Hero section - use Futura for title */
	.nike-corporate :global(.case-title) {
		font-family: Futura, 'Futura PT', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
		font-weight: 700 !important;
		text-transform: uppercase !important;
		letter-spacing: 0.02em !important;
	}

	/* Headings - Nike's minimal black/white aesthetic */
	.nike-corporate :global(.case-content h2) {
		color: var(--nike-text-primary);
		font-family: Futura, 'Futura PT', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: 700;
		font-size: 3rem; /* 48px - Nike uses large, bold headings */
		line-height: 1.2;
		letter-spacing: -0.02em;
		margin-bottom: var(--nike-spacing-md);
		text-transform: uppercase; /* Nike often uses uppercase for major headings */
	}

	.nike-corporate :global(.case-content h3) {
		color: var(--nike-text-primary);
		font-family: Futura, 'Futura PT', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: 600;
		font-size: 1.625rem; /* 26px */
		line-height: 1.3;
		letter-spacing: 0.02em;
		margin-bottom: var(--nike-spacing-sm);
	}

	/* Body text - clean, readable */
	.nike-corporate :global(.case-content p) {
		color: var(--nike-text-primary);
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 1rem; /* 16px */
		line-height: 1.75;
		margin-bottom: var(--nike-spacing-sm);
	}

	.nike-corporate :global(.case-content li) {
		color: var(--nike-text-primary);
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		line-height: 1.75;
	}

	/* Highlight boxes - minimal Nike style */
	.nike-corporate :global(.case-content .highlight-box) {
		background: var(--nike-bg-tertiary);
		border-left: 4px solid var(--nike-text-primary);
		border-radius: 0;
		padding: var(--nike-spacing-md);
		margin: var(--nike-spacing-lg) 0;
	}

	.nike-corporate :global(.case-content .highlight-box p) {
		margin-bottom: var(--nike-spacing-xs);
	}

	.nike-corporate :global(.case-content .highlight-box p:last-child) {
		margin-bottom: 0;
	}

	/* Links - understated Nike style */
	.nike-corporate :global(.case-content a) {
		color: var(--nike-text-primary);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	.nike-corporate :global(.case-content a:hover) {
		color: var(--nike-text-secondary);
		text-decoration-thickness: 2px;
	}

	/* Code blocks - minimal */
	.nike-corporate :global(.case-content code) {
		background: var(--nike-bg-tertiary);
		color: var(--nike-text-primary);
		padding: 2px 8px;
		border-radius: 4px;
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.875rem;
	}

	/* Strong text */
	.nike-corporate :global(.case-content strong) {
		font-weight: 700;
	}

	/* CTA Section - Nike's dark theme */
	.nike-corporate :global(.case-cta) {
		background: var(--nike-bg-dark);
		color: var(--nike-text-on-dark);
	}

	.nike-corporate :global(.case-cta h2),
	.nike-corporate :global(.case-cta p) {
		color: var(--nike-text-on-dark);
	}

	.nike-corporate :global(.case-cta .cta-button) {
		background: var(--nike-bg-light);
		color: var(--nike-text-primary);
		border-radius: 80px; /* Nike's signature pill-shaped buttons */
		padding: 13px 24px;
		height: 40px;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: 500;
		font-size: 1rem;
		border: none;
		transition: opacity 0.3s ease, background 0.3s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.nike-corporate :global(.case-cta .cta-button:hover) {
		opacity: 0.75;
		background: var(--nike-bg-light);
		color: var(--nike-text-primary);
		transform: none; /* Nike doesn't use transform on hover */
	}

	/* Tags - minimal black/white (force override with higher specificity) */
	.nike-corporate :global(.pill) {
		background: var(--nike-text-primary) !important;
		color: var(--nike-text-on-dark) !important;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
		font-weight: 500 !important;
		border-radius: 80px !important;
		padding: 8px 16px !important;
		font-size: 0.875rem !important;
		border: none !important;
	}

	/* Section spacing */
	.nike-corporate :global(.case-content section) {
		margin-bottom: var(--nike-spacing-xl);
	}

	/* Two-column layout adjustments */
	.nike-corporate :global(.case-content .two-column) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--nike-spacing-md);
	}

	@media (max-width: 768px) {
		.nike-corporate :global(.case-content .two-column) {
			grid-template-columns: 1fr;
		}

		.nike-corporate :global(.case-content h2) {
			font-size: 2rem; /* 32px on mobile */
		}

		.nike-corporate :global(.case-content h3) {
			font-size: 1.375rem; /* 22px on mobile */
		}
	}
</style>
