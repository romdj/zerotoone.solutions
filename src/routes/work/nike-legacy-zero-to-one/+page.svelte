<script lang="ts">
	import CaseStudyLayout from '$lib/components/CaseStudyLayout.svelte';

	export let data;
</script>

<svelte:head>
	<title>Nike - Supply Chain Execution Platform | Zero to One Solutions</title>
	<meta name="description" content="Architected, designed, and built cloud-native platform processing millions of supply chain events daily across Nike's global operations." />
</svelte:head>

<CaseStudyLayout
	company="Nike"
	logo="/logos/nike-swoosh-logo-paint-cropped.png"
	title="Supply Chain Execution Platform"
	role="Technical Architect"
	tags={['Event-Driven Architecture', 'Supply Chain', 'AWS', 'Team Leadership', 'SAP S4/HANA', 'KAPPA Architecture']}
	headerImage={data.headerImage}
>
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
</CaseStudyLayout>
