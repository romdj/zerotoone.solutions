<script lang="ts">
	import CaseStudyLayout from '$lib/components/CaseStudyLayout.svelte';

	export let data;
</script>

<svelte:head>
	<title>ABVV-FGTB - Mainframe Modernization | Zero to One Solutions</title>
	<meta name="description" content="Transforming Belgium's largest trade union from 30-year-old AS400 mainframe to modern cloud platform. CQRS, event sourcing, and microfrontends serving 1M+ members without stopping the business." />
</svelte:head>

<div class="fgtb-corporate">
<CaseStudyLayout
	company="ABVV-FGTB"
	logo="/logos/abvv-fgtb.png"
	title="AS400 Mainframe Modernization"
	tags={['Legacy Modernization', 'Mainframe', 'CQRS', 'Microfrontends', 'Event Sourcing', 'AS400']}
	headerImage={data.headerImage}
>
	<!-- The Challenge -->
	<section>
		<h2>The Challenge</h2>
		<p>
			ABVV-FGTB (Algemeen Belgisch Vakverbond / Fédération Générale du Travail de Belgique) is Belgium's largest trade union, representing over 1 million members. For 30 years, all member services, contributions, and benefits ran on an AS400 mainframe. Green-screen terminals. COBOL batch jobs. Nightly processing windows. A system that worked—but couldn't evolve.
		</p>
		<p>
			The business needed digital member portals, real-time contribution tracking, mobile apps, and integration with external partners. The mainframe couldn't deliver any of this. But it also couldn't stop—member services are critical, operational 24/7, with strict regulatory requirements.
		</p>

		<div class="highlight-box">
			<p><strong>The Core Constraints:</strong></p>
			<ul>
				<li><strong>Zero Downtime:</strong> 1M+ members depend on services daily. No maintenance windows.</li>
				<li><strong>Data Integrity:</strong> 30 years of member data, contributions, and benefits. Can't lose anything.</li>
				<li><strong>Regulatory Compliance:</strong> Belgian social security law, GDPR, financial regulations.</li>
				<li><strong>Legacy Integration:</strong> Mainframe can't be turned off overnight. Gradual migration required.</li>
				<li><strong>Modern UX:</strong> Members expect mobile apps and self-service portals, not green screens.</li>
			</ul>
		</div>

		<p>
			The architectural challenge: build a modern cloud platform that gradually replaces the mainframe, maintains perfect data consistency during migration, and delivers new features—all while the old system continues running production workloads.
		</p>
	</section>

	<!-- The Context -->
	<section>
		<h2>The Belgian Trade Union Landscape</h2>
		<p>
			Understanding ABVV-FGTB requires understanding Belgium's unique social model. Trade unions aren't just labor organizations—they're critical infrastructure. They process unemployment benefits, manage pension contributions, provide legal services, and negotiate collective labor agreements across industries.
		</p>
		<p>
			ABVV-FGTB operates across multiple regions (Flanders, Wallonia, Brussels), languages (Dutch, French, German), and sectors (metalworkers, public services, healthcare, etc.). The data model reflects 30 years of Belgian labor law evolution, regional variations, and sector-specific rules.
		</p>
		<p>
			This isn't just "move data to the cloud." It's modernizing critical social infrastructure while maintaining services that 1 million people depend on for their livelihoods.
		</p>
	</section>

	<!-- The Design Space -->
	<section>
		<h2>The Design Space</h2>
		<p>
			We evaluated three fundamental approaches to mainframe modernization:
		</p>

		<h3>Option 1: Big Bang Replacement</h3>
		<p><strong>Build new system, migrate all data, cut over on launch day</strong></p>
		<ul>
			<li><strong>Pros:</strong> Clean break. No dual system complexity. Modern architecture from day one.</li>
			<li><strong>Cons:</strong> Massive risk. Single point of failure. No rollback if migration fails.</li>
			<li><strong>Why we rejected it:</strong> Too risky for critical social infrastructure. One data inconsistency affects thousands of members.</li>
		</ul>

		<h3>Option 2: Lift and Shift</h3>
		<p><strong>Move AS400 to cloud infrastructure, modernize incrementally</strong></p>
		<ul>
			<li><strong>Pros:</strong> Lower migration risk. Maintain existing workflows. Gradual modernization.</li>
			<li><strong>Cons:</strong> Still stuck with COBOL. Cloud costs high. Doesn't solve UX problems.</li>
			<li><strong>Why we rejected it:</strong> Delays problem, doesn't solve it. Business needs modern UX now, not later.</li>
		</ul>

		<h3>Option 3: Strangler Fig Pattern with CQRS</h3>
		<p><strong>Build new system alongside mainframe, gradually migrate domains</strong></p>
		<ul>
			<li><strong>Pros:</strong> Incremental migration. Rollback per domain. Both systems run in parallel during transition.</li>
			<li><strong>Cons:</strong> Complex dual-write problem. Data consistency challenges. Longer migration timeline.</li>
			<li><strong>Why we chose it:</strong> Risk mitigation. Could prove value domain-by-domain. Business continuity maintained.</li>
		</ul>

		<div class="highlight-box">
			<p><strong>The Architectural Bet:</strong> CQRS (Command Query Responsibility Segregation) lets us write new commands to the modern system while the mainframe continues serving queries. Event sourcing provides audit trail and data reconciliation. Gradually flip domains from mainframe to cloud as confidence builds.</p>
		</div>
	</section>

	<!-- The Architecture -->
	<section>
		<h2>The Architecture: CQRS + Event Sourcing + Microfrontends</h2>
		<p>
			The technical architecture had to solve the dual-system problem: mainframe and cloud running simultaneously, serving the same members, without data divergence.
		</p>

		<h3>Command Side: Modern Cloud Platform</h3>
		<p>
			All new write operations go to the modern platform:
		</p>
		<ul>
			<li><strong>Domain Services:</strong> Member registration, contribution processing, benefit claims</li>
			<li><strong>Event Store:</strong> Every command produces immutable events (MemberRegistered, ContributionPaid, BenefitClaimed)</li>
			<li><strong>Command Validation:</strong> Business rules enforced in cloud services, not database constraints</li>
			<li><strong>Sync to Mainframe:</strong> Events replayed to mainframe for backward compatibility during migration</li>
		</ul>

		<h3>Query Side: Dual Read Path</h3>
		<p>
			During migration, queries hit both systems:
		</p>
		<ul>
			<li><strong>Mainframe (legacy data):</strong> Data not yet migrated, accessed via DB2 connectors</li>
			<li><strong>Cloud (new data):</strong> Data created post-migration, optimized read models in PostgreSQL</li>
			<li><strong>Data Router:</strong> Determines which system owns which member data, routes queries accordingly</li>
		</ul>

		<h3>Microfrontend Architecture</h3>
		<p>
			Frontend couldn't wait for full backend migration. Microfrontends allowed incremental UX modernization:
		</p>
		<ul>
			<li><strong>Member Portal:</strong> React microfrontend for member self-service</li>
			<li><strong>Admin Tools:</strong> Angular microfrontend for union staff</li>
			<li><strong>Mobile App:</strong> React Native consuming same APIs</li>
			<li><strong>Module Federation:</strong> Webpack 5 module federation for runtime composition</li>
		</ul>

		<div class="highlight-box">
			<h3>Data Migration Strategy</h3>
			<p><strong>Phase 1:</strong> New members only. All new registrations go to cloud. Mainframe frozen for new writes in this domain.</p>
			<p><strong>Phase 2:</strong> Bulk migrate historical members by region. Validate data consistency. Flip region-by-region.</p>
			<p><strong>Phase 3:</strong> Decommission mainframe modules as cloud ownership proven. Reduce mainframe licenses incrementally.</p>
		</div>
	</section>

	<!-- Implementation Challenges -->
	<section>
		<h2>Implementation Reality</h2>
		<p>
			Theory is elegant. Reality is messier. Here's what actually happened:
		</p>

		<h3>Challenge 1: The Data Model From Hell</h3>
		<p>
			30 years of Belgian labor law encoded in COBOL. Fields like <code>MEMBER_STATUS_CODE</code> had 47 possible values, each with region-specific meaning. No documentation. Only the COBOL knew the truth.
		</p>
		<p><strong>Solution:</strong> Reverse engineering sessions with COBOL developers (some retired, called back as consultants). Built data dictionary manually. 6 months just understanding the domain model.</p>

		<h3>Challenge 2: Dual-Write Consistency</h3>
		<p>
			Writing to cloud and syncing to mainframe introduced race conditions. Member updates in cloud sometimes arrived at mainframe before batch jobs completed, causing data conflicts.
		</p>
		<p><strong>Solution:</strong> Event timestamp ordering. Mainframe batch jobs learned to check event timestamps. Later events always win. Idempotent event handlers prevented double-processing.</p>

		<h3>Challenge 3: The Multilingual Problem</h3>
		<p>
			Member data in Dutch, French, German. Legal documents must be in member's preferred language. Business rules different per region. Even field names localized in COBOL.
		</p>
		<p><strong>Solution:</strong> i18n at database layer, not UI layer. Event payload includes language context. Business rules parameterized by region. Translation tables in PostgreSQL.</p>

		<h3>Challenge 4: Performance Cliff</h3>
		<p>
			Query router added latency. Queries that hit both systems (mainframe + cloud) took 3-5 seconds. Unacceptable for member-facing UX.
		</p>
		<p><strong>Solution:</strong> Materialized views in cloud. Background sync jobs replicate mainframe data to read-only PostgreSQL replica. Router checks cloud first, falls back to mainframe only if data absent. Latency dropped to ~200ms.</p>
	</section>

	<!-- The Results -->
	<section>
		<h2>The System in Production</h2>
		<p>
			Three years into the migration, here's the current state:
		</p>

		<h3>Migration Progress</h3>
		<ul>
			<li><strong>60% of members migrated</strong> - All new registrations + 2 major regions fully migrated</li>
			<li><strong>3 domains fully cloud-native</strong> - Member registration, contribution tracking, digital communications</li>
			<li><strong>Mainframe workload reduced 40%</strong> - CPU and license costs decreasing</li>
			<li><strong>Zero data loss incidents</strong> - Event sourcing audit trail prevented reconciliation issues</li>
		</ul>

		<h3>New Capabilities Delivered</h3>
		<ul>
			<li><strong>Member Self-Service Portal:</strong> 300K+ active users, 24/7 access to contribution history</li>
			<li><strong>Mobile App:</strong> 150K downloads, 4.2★ rating, push notifications for benefit updates</li>
			<li><strong>Real-Time Reporting:</strong> Union staff see member data in real-time, not next-day batch reports</li>
			<li><strong>Partner Integrations:</strong> APIs for Belgian social security, pension funds, unemployment offices</li>
		</ul>

		<h3>Team & Organizational Impact</h3>
		<p>
			Technology transformation forced organizational change:
		</p>
		<ul>
			<li><strong>COBOL team trained in cloud</strong> - 5 mainframe developers became cloud engineers</li>
			<li><strong>DevOps culture established</strong> - CI/CD pipelines, infrastructure as code, automated testing</li>
			<li><strong>Product thinking adopted</strong> - Quarterly roadmaps, member feedback loops, A/B testing</li>
		</ul>

		<div class="highlight-box">
			<h3>The Path Forward</h3>
			<p>
				Full mainframe decommissioning planned for 2026. Benefits domain (most complex) migrates in 2025. Final mainframe shutdown will mark end of 35-year era.
			</p>
			<p>
				But the real win isn't technology—it's capability. ABVV-FGTB can now build digital services in weeks, not years. Member experience improved. Operational costs decreasing. That's the value of modern architecture.
			</p>
		</div>
	</section>

	<!-- Technology Stack -->
	<section>
		<h2>Technology Choices & Why</h2>

		<div class="two-column">
			<div>
				<h3>Backend Platform</h3>
				<ul>
					<li><strong>Node.js + TypeScript:</strong> Event-driven architecture. Strong typing for domain model.</li>
					<li><strong>PostgreSQL:</strong> Mature, supports JSONB for flexible schemas. ACID guarantees.</li>
					<li><strong>EventStoreDB:</strong> Purpose-built event sourcing database. Event replay, projections.</li>
					<li><strong>RabbitMQ:</strong> Event bus between services. Reliable message delivery.</li>
				</ul>
			</div>
			<div>
				<h3>Frontend & Infrastructure</h3>
				<ul>
					<li><strong>React + Module Federation:</strong> Microfrontends. Team autonomy. Incremental deployment.</li>
					<li><strong>Docker + Kubernetes:</strong> Containerization. Auto-scaling. Blue-green deployments.</li>
					<li><strong>Azure:</strong> Hybrid cloud. VPN to mainframe. GDPR compliance (EU data residency).</li>
					<li><strong>Grafana + Prometheus:</strong> Observability. Event metrics. Migration dashboards.</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Lessons Learned -->
	<section>
		<h2>What We Would Do Differently</h2>
		<ul>
			<li><strong>Start with simpler domain:</strong> We chose member registration first (complex). Should have started with static reference data.</li>
			<li><strong>Invest in data quality earlier:</strong> 6 months cleaning mainframe data before migration. Should have been parallel effort from day one.</li>
			<li><strong>Automated reconciliation from start:</strong> Manual data validation between systems was error-prone. Automated checks would have caught issues faster.</li>
			<li><strong>More conservative timelines:</strong> Estimated 3 years for full migration. Now projecting 5 years. Legacy is always more complex than expected.</li>
			<li><strong>Better stakeholder management:</strong> Union leaders wanted instant results. More transparent communication about incremental progress would have set expectations.</li>
		</ul>
	</section>

	<!-- Principles Extracted -->
	<section>
		<h2>Architectural Principles for Mainframe Modernization</h2>
		<p>
			Beyond ABVV-FGTB, these patterns apply to any legacy modernization:
		</p>
		<ul>
			<li><strong>Strangler Fig > Big Bang:</strong> Incremental migration reduces risk. Prove value domain-by-domain.</li>
			<li><strong>Event Sourcing = Audit Trail:</strong> Immutable events provide reconciliation safety net. Can replay if migration goes wrong.</li>
			<li><strong>CQRS for dual systems:</strong> Separate write (cloud) from read (mainframe + cloud) during migration. Gradually flip reads to cloud.</li>
			<li><strong>Data quality is half the work:</strong> Understanding legacy data model takes longer than building new system. Budget accordingly.</li>
			<li><strong>Organizational change > technical change:</strong> COBOL developers becoming cloud engineers requires training, patience, culture shift.</li>
			<li><strong>Never underestimate 30 years of business logic:</strong> Every weird COBOL field exists for a reason (usually regulatory). Understand before replacing.</li>
		</ul>
	</section>
</CaseStudyLayout>
</div>

<style>
	/* FGTB/ABVV Corporate Brand Styling - Socialist Labor Union Design */
	.fgtb-corporate {
		--fgtb-red: #e82712;
		--fgtb-dark-red: #c71f0f;
		--fgtb-black: #1a1a1a;
		--fgtb-text: #1a1a1a;
		--fgtb-text-light: #666666;
	}

	/* Hero section - Socialist red background */
	.fgtb-corporate :global(.case-hero) {
		background: linear-gradient(135deg, var(--fgtb-red), var(--fgtb-dark-red)) !important;
	}

	/* Title - Bold labor movement typography */
	.fgtb-corporate :global(.case-title) {
		font-family: 'Oscine', 'Helvetica', 'Arial', sans-serif !important;
		font-weight: 700 !important;
		color: #ffffff !important;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	/* H2 - Strong red headers with black underline */
	.fgtb-corporate :global(.case-content h2) {
		font-family: 'Oscine', 'Helvetica', 'Arial', sans-serif;
		font-weight: 700;
		font-size: 2.5rem;
		color: var(--fgtb-red);
		border-bottom: 3px solid var(--fgtb-black);
		padding-bottom: 12px;
		margin-bottom: 24px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* H3 - Red accent */
	.fgtb-corporate :global(.case-content h3) {
		font-family: 'Oscine', 'Helvetica', 'Arial', sans-serif;
		font-weight: 600;
		color: var(--fgtb-red);
	}

	/* Tags/Pills - Red socialist banners */
	.fgtb-corporate :global(.pill) {
		background: var(--fgtb-red) !important;
		color: #ffffff !important;
		border: none !important;
		border-radius: 2px !important;
		font-family: 'Oscine', 'Helvetica', 'Arial', sans-serif;
		text-transform: uppercase;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.5px;
	}

	/* Highlight boxes - Red accent stripe */
	.fgtb-corporate :global(.highlight-box) {
		background: #fff5f5 !important;
		border-left: 4px solid var(--fgtb-red) !important;
		border-radius: 0 !important;
	}

	.fgtb-corporate :global(.highlight-box strong) {
		color: var(--fgtb-red);
	}

	/* CTA Button - Black on red background */
	.fgtb-corporate :global(.case-cta) {
		background: var(--fgtb-red) !important;
	}

	.fgtb-corporate :global(.case-cta .cta-button) {
		background: var(--fgtb-black) !important;
		color: #ffffff !important;
		border-radius: 2px !important;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 1px;
	}

	.fgtb-corporate :global(.case-cta .cta-button:hover) {
		background: #000000 !important;
		transform: translateY(-2px);
	}

	/* Body text - High contrast for accessibility */
	.fgtb-corporate :global(.case-content p),
	.fgtb-corporate :global(.case-content li) {
		color: var(--fgtb-text);
		font-family: 'Oscine', 'Helvetica', 'Arial', sans-serif;
	}

	/* Code snippets - Black monospace */
	.fgtb-corporate :global(code) {
		background: #f5f5f5;
		color: var(--fgtb-black);
		padding: 2px 6px;
		border-radius: 2px;
		font-family: 'Courier New', monospace;
		font-weight: 600;
	}

	/* Two-column sections */
	.fgtb-corporate :global(.two-column) {
		gap: 32px;
	}

	.fgtb-corporate :global(.two-column h3) {
		color: var(--fgtb-red);
		border-bottom: 2px solid var(--fgtb-black);
		padding-bottom: 8px;
	}
</style>
