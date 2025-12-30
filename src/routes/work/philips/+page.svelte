<script lang="ts">
	import CaseStudyLayout from '$lib/components/CaseStudyLayout.svelte';

	export let data;
</script>

<svelte:head>
	<title>Philips - Healthcare Platform Backend Services | Zero to One Solutions</title>
	<meta name="description" content="Building the secure backbone for connected healthcare. Platform services managing medical device fleets, patient data flows, and real-time health monitoring with healthcare-grade compliance." />
	<!-- Philips uses Neue Frutiger World; fallback to Segoe UI and system fonts -->
</svelte:head>

<div class="philips-corporate">
	<CaseStudyLayout
		company="Philips"
		logo="/logos/Philips_plain-text.svg"
		title="Healthcare Platform Backend Services"
		tags={['Healthcare', 'IoT', 'Serverless', 'AWS', 'FHIR', 'IEC 62304', 'Medical Devices']}
		headerImage={data.headerImage}
	>
		<!-- The Architectural Challenge -->
		<section>
			<h2>The Architectural Challenge</h2>
			<p>
				Healthcare IoT is different. A bug in a food delivery app means late dinner. A bug in medical device software means patient harm. The architectural constraints aren't just technical—they're regulatory, legal, and ethical.
			</p>
			<p>
				Philips HealthSuite Digital Platform needed to manage thousands of connected medical devices across hospitals worldwide. Each device generating patient data. Each data point potentially life-critical. All while complying with IEC 62304 (medical device software lifecycle), FHIR (healthcare interoperability), and various regional data protection regulations.
			</p>

			<div class="highlight-box">
				<p><strong>The Core Technical Constraints:</strong></p>
				<ul>
					<li><strong>Patient Safety:</strong> Software bugs can't just crash—they can harm patients. IEC 62304 Class B/C requirements apply.</li>
					<li><strong>Data Security:</strong> Protected Health Information (PHI) requires encryption at rest, in transit, and during processing. HIPAA compliance mandatory.</li>
					<li><strong>Device Fleet Management:</strong> Thousands of heterogeneous devices, different firmware versions, unreliable networks.</li>
					<li><strong>Real-Time Requirements:</strong> Some devices stream vital signs. Latency matters. Downtime isn't acceptable.</li>
					<li><strong>Regulatory Compliance:</strong> Every architectural decision needed documentation and validation for regulatory submissions.</li>
				</ul>
			</div>

			<p>
				The technical challenge: build highly available, scalable IoT platform while meeting medical device software standards. No off-the-shelf solution existed.
			</p>
		</section>

		<!-- The Design Space -->
		<section>
			<h2>The Design Space</h2>
			<p>
				We evaluated three platform architectures for medical device IoT:
			</p>

			<h3>Option 1: Traditional Monolith with MQTT Broker</h3>
			<p><strong>Single application, centralized MQTT broker, SQL database</strong></p>
			<ul>
				<li><strong>Pros:</strong> Simple deployment. Easier compliance documentation (single system). Well-understood ops model.</li>
				<li><strong>Cons:</strong> Single point of failure. Difficult to scale device connections. Update requires downtime.</li>
				<li><strong>Why we rejected it:</strong> Couldn't meet availability requirements. Global deployment would require complex replication.</li>
			</ul>

			<h3>Option 2: Microservices with Managed Message Queue</h3>
			<p><strong>Domain services, RabbitMQ/Kafka for messaging, separate databases</strong></p>
			<ul>
				<li><strong>Pros:</strong> Better availability (partial failures possible). Easier team scaling. Can deploy services independently.</li>
				<li><strong>Cons:</strong> Distributed system complexity. Message queue becomes bottleneck. Cross-service queries hard. IEC 62304 documentation multiplies.</li>
				<li><strong>Why we rejected it:</strong> Regulatory overhead of documenting microservice interactions was prohibitive. Message queue single point of failure.</li>
			</ul>

			<h3>Option 3: Serverless with AWS IoT Core</h3>
			<p><strong>AWS Lambda functions, IoT Core for device management, managed services</strong></p>
			<ul>
				<li><strong>Pros:</strong> AWS handles availability. Auto-scaling with load. Pay-per-use. AWS compliance certifications reduce burden.</li>
				<li><strong>Cons:</strong> Vendor lock-in. Less control over infrastructure. Cold starts could affect latency. Learning curve for team.</li>
				<li><strong>Why we chose it:</strong> AWS's HIPAA BAA and SOC 2 certifications. Built-in device fleet management (IoT Core). Serverless meant no infrastructure to maintain under IEC 62304.</li>
			</ul>

			<div class="highlight-box">
				<p><strong>The Technical Bet:</strong> We bet that serverless architecture would reduce our IEC 62304 compliance surface area. By using managed AWS services with their own certifications, we could focus compliance efforts on our application logic rather than infrastructure management.</p>
			</div>
		</section>

		<!-- The Key Decision -->
		<section>
			<h2>The Key Decision: Separation of Concerns via Services</h2>
			<p>
				The architecture pivoted on decomposing the platform into three core services, each with clear boundaries:
			</p>

			<h3>Service 1: Data Broker (Mediator Pattern)</h3>
			<p><strong>Purpose:</strong> Ingest, clean, parse, and distribute data from medical devices</p>
			<ul>
				<li><strong>Input:</strong> Raw device data in various formats (HL7, proprietary)</li>
				<li><strong>Processing:</strong> Schema validation, data normalization, quality checks</li>
				<li><strong>Output:</strong> Clean FHIR-compliant observations routed to analytics, storage, alerts</li>
				<li><strong>Tech:</strong> Lambda + Kinesis + SNS + SQS for guaranteed delivery</li>
			</ul>

			<h3>Service 2: IoT Gateway</h3>
			<p><strong>Purpose:</strong> Manage device fleet - authentication, connection, commands, monitoring</p>
			<ul>
				<li><strong>Device Auth:</strong> Certificate-based per-device authentication via IoT Core</li>
				<li><strong>Connection Mgmt:</strong> MQTT connections with automatic reconnect and backoff</li>
				<li><strong>Device Shadow:</strong> Track device state (online/offline, config, firmware version)</li>
				<li><strong>Tech:</strong> AWS IoT Core + Lambda + DynamoDB for state storage</li>
			</ul>

			<h3>Service 3: Firmware Distribution</h3>
			<p><strong>Purpose:</strong> Secure over-the-air firmware updates with rollout control</p>
			<ul>
				<li><strong>Versioning:</strong> Track firmware versions per device type</li>
				<li><strong>Staged Rollout:</strong> Canary deployments (5% → 25% → 100%)</li>
				<li><strong>Rollback:</strong> Automatic rollback if device errors spike</li>
				<li><strong>Tech:</strong> S3 signed URLs + DynamoDB for version tracking + Lambda for orchestration</li>
			</ul>

			<h3>The Trade-offs We Accepted</h3>
			<p><strong>What we gave up:</strong></p>
			<ul>
				<li><strong>Infrastructure control:</strong> Dependent on AWS service availability and limits</li>
				<li><strong>Custom optimizations:</strong> Can't tune infrastructure for specific use cases</li>
				<li><strong>Cost predictability:</strong> Pay-per-use means variable costs with device growth</li>
			</ul>

			<p><strong>What we gained:</strong></p>
			<ul>
				<li><strong>Compliance leverage:</strong> AWS certifications cover infrastructure layer</li>
				<li><strong>Availability:</strong> AWS SLAs (99.9%+) without operating our own infrastructure</li>
				<li><strong>Team velocity:</strong> No ops overhead, team focuses on healthcare domain logic</li>
				<li><strong>Global reach:</strong> Deploy to multiple AWS regions without infrastructure complexity</li>
			</ul>
		</section>

		<!-- Implementation Reality -->
		<section>
			<h2>Implementation Reality</h2>
			<p>
				Theory meets practice—and healthcare compliance. Here's what happened during build:
			</p>

			<h3>Challenge 1: Lambda Cold Starts with Real-Time Devices</h3>
			<p>
				Some medical devices stream vital signs in real-time (ECG, blood pressure). Lambda cold starts (5-10 seconds) were unacceptable.
			</p>
			<p><strong>Solution:</strong> Reserved concurrency for critical path Lambdas. Pre-warming via CloudWatch Events. Graceful degradation—device buffers data during cold start, replays once connection stable.</p>

			<h3>Challenge 2: IEC 62304 Documentation for Serverless</h3>
			<p>
				IEC 62304 requires software architecture documentation, risk analysis, and traceability. How do you document "architecture" when it's Lambda + managed services?
			</p>
			<p><strong>Solution:</strong> Event-driven architecture diagrams showing data flows. AWS service docs referenced for infrastructure. Focus compliance on our code (Lambda functions). Test-driven development with 100% coverage as evidence of verification.</p>

			<h3>Challenge 3: FHIR Data Transformation at Scale</h3>
			<p>
				Converting proprietary device formats to FHIR Observations was complex. Different devices, different schemas, evolving FHIR spec.
			</p>
			<p><strong>Solution:</strong> Strategy pattern for device-specific transforms. FHIR libraries for validation. Schema registry for device formats. Backward compatibility through versioned transformers.</p>

			<h3>Challenge 4: HIPAA Compliance in Serverless</h3>
			<p>
				PHI must be encrypted everywhere. How to ensure encryption across Lambda, Kinesis, S3, DynamoDB?
			</p>
			<p><strong>Solution:</strong> KMS encryption for all AWS services. Encrypted Lambda environment variables. Data encrypted before entry to any AWS service. IAM policies restricting service-to-service communication. Regular compliance audits.</p>

			<h3>The Technical Debt We Managed</h3>
			<ul>
				<li><strong>Testing serverless locally:</strong> LocalStack helped but wasn't perfect. Integration tests required AWS sandbox account.</li>
				<li><strong>Monitoring distributed failures:</strong> X-Ray tracing added late. Early debugging was painful without distributed traces.</li>
				<li><strong>Cost monitoring:</strong> Initial Lambda invocations weren't optimized. Fixed after first month's surprise bill.</li>
			</ul>
		</section>

		<!-- The System in Production -->
		<section>
			<h2>The System in Production</h2>
			<p>
				What the platform actually looks like serving healthcare providers globally:
			</p>

			<h3>Scale Metrics</h3>
			<ul>
				<li><strong>Device Fleet:</strong> Thousands of connected medical devices across multiple hospitals</li>
				<li><strong>Data Throughput:</strong> Millions of FHIR observations processed monthly</li>
				<li><strong>Latency:</strong> p95 end-to-end (device → FHIR observation stored) under 2 seconds</li>
				<li><strong>Availability:</strong> 99.95% uptime across all regions</li>
			</ul>

			<h3>Compliance Achievements</h3>
			<ul>
				<li><strong>IEC 62304:</strong> Platform certified as Class B medical device software</li>
				<li><strong>FHIR Compliance:</strong> All observations validated against FHIR R4 spec</li>
				<li><strong>HIPAA:</strong> Full BAA with AWS, encryption at rest and in transit, audit logging</li>
				<li><strong>Regional:</strong> GDPR compliant (EU), data residency controls per region</li>
			</ul>

			<h3>Operational Lessons</h3>
			<p><strong>What surprised us:</strong></p>
			<ul>
				<li><strong>Device diversity was harder than expected:</strong> Even "standard" protocols had vendor-specific quirks requiring custom handling</li>
				<li><strong>Network reliability mattered more than we thought:</strong> Hospital WiFi often unreliable. Required robust retry and buffering logic</li>
				<li><strong>Firmware updates were riskier than predicted:</strong> Even staged rollouts hit edge cases. Needed per-hospital control.</li>
			</ul>

			<p><strong>What worked better than expected:</strong></p>
			<ul>
				<li><strong>Serverless compliance leverage:</strong> Auditors accepted AWS certifications. Reduced our compliance burden significantly.</li>
				<li><strong>TDD for medical software:</strong> 100% test coverage caught bugs before production. Regulatory auditors loved it.</li>
				<li><strong>CloudWatch Logs for compliance:</strong> Immutable audit trail out-of-the-box. HIPAA auditors approved.</li>
			</ul>

			<div class="highlight-box">
				<h3>The Platform's Evolution</h3>
				<p>
					Platform now supports multiple Philips HealthSuite applications. Architecture pattern adopted by other Philips teams. The bet on serverless paid off—not just technically, but for compliance velocity.
				</p>
				<p>
					<strong>Next evolution:</strong> Real-time ML models for early warning systems. Predictive alerts for patient deterioration. All possible because clean FHIR data flows in real-time.
				</p>
			</div>
		</section>

		<!-- Technology Choices & Why -->
		<section>
			<h2>Technology Choices & Why</h2>

			<div class="two-column">
				<div>
					<h3>Device Connectivity</h3>
					<ul>
						<li><strong>AWS IoT Core:</strong> Device registry, MQTT broker, certificate auth, device shadows</li>
						<li><strong>MQTT:</strong> Lightweight protocol for medical devices, reliable delivery</li>
						<li><strong>X.509 Certificates:</strong> Per-device authentication meeting medical device security requirements</li>
					</ul>
				</div>
				<div>
					<h3>Data Processing</h3>
					<ul>
						<li><strong>Lambda + Node.js:</strong> Fast iteration, TypeScript for type safety, serverless scaling</li>
						<li><strong>Kinesis:</strong> Stream processing for device data, guaranteed delivery</li>
						<li><strong>SNS/SQS:</strong> Pub-sub for data distribution, dead letter queues for failures</li>
					</ul>
				</div>
			</div>

			<div class="two-column">
				<div>
					<h3>Healthcare Standards</h3>
					<ul>
						<li><strong>FHIR R4:</strong> Interoperability standard for healthcare data exchange</li>
						<li><strong>IEC 62304:</strong> Medical device software lifecycle compliance framework</li>
						<li><strong>HIPAA Controls:</strong> PHI encryption, audit logging, access controls</li>
					</ul>
				</div>
				<div>
					<h3>Quality & Testing</h3>
					<ul>
						<li><strong>Jest:</strong> Unit testing, 100% coverage requirement</li>
						<li><strong>LocalStack:</strong> Local AWS service emulation for integration tests</li>
						<li><strong>Mocha/Sinon:</strong> Additional testing frameworks for complex scenarios</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- What We Would Do Differently -->
		<section>
			<h2>What We Would Do Differently</h2>
			<ul>
				<li><strong>X-Ray from day one:</strong> Distributed tracing critical for debugging serverless. Should have enabled from start.</li>
				<li><strong>Cost alarms earlier:</strong> Lambda invocations can surprise you. Set CloudWatch alarms on costs from beginning.</li>
				<li><strong>Device simulator sooner:</strong> Built complex device simulator late. Needed it from architecture phase for load testing.</li>
				<li><strong>Staged rollout automation:</strong> Manual firmware rollout initially. Should have automated canary deployments from start.</li>
				<li><strong>FHIR validation performance:</strong> Validation was slow initially. Should have profiled and optimized earlier.</li>
			</ul>
		</section>

		<!-- Architectural Principles -->
		<section>
			<h2>Architectural Principles for Healthcare IoT</h2>
			<p>
				Beyond Philips, these patterns apply to any medical device IoT platform:
			</p>
			<ul>
				<li><strong>Compliance is architecture:</strong> Regulatory requirements aren't add-ons. They shape system design from day one.</li>
				<li><strong>Managed services reduce compliance surface:</strong> AWS certifications cover infrastructure. Focus your compliance efforts on domain logic.</li>
				<li><strong>Device heterogeneity is inevitable:</strong> Plan for device diversity. Strategy pattern for device-specific logic. Avoid "one size fits all."</li>
				<li><strong>Network reliability assumptions fail in healthcare:</strong> Hospital networks are unreliable. Buffer, retry, graceful degradation are non-negotiable.</li>
				<li><strong>Testing is compliance evidence:</strong> 100% test coverage isn't just quality—it's regulatory documentation. TDD pays off in audits.</li>
				<li><strong>Encryption everywhere isn't paranoia:</strong> PHI requires encryption at rest, in transit, during processing. No exceptions. Plan for it upfront.</li>
			</ul>
		</section>

		<!-- Healthcare Compliance Details -->
		<section>
			<h2>IEC 62304 Compliance in Practice</h2>
			<p>
				What medical device software compliance actually looked like:
			</p>

			<h3>Software Safety Classification</h3>
			<p>
				Platform classified as <strong>IEC 62304 Class B</strong> (serious injury possible if software fails). Required:
			</p>
			<ul>
				<li>Software requirements specification with traceability to features</li>
				<li>Architecture documentation showing component interactions</li>
				<li>Design documentation for each component</li>
				<li>Verification testing (unit, integration, system) with documented results</li>
				<li>Risk management throughout software lifecycle</li>
			</ul>

			<h3>How Serverless Affected Compliance</h3>
			<ul>
				<li><strong>Reduced scope:</strong> AWS infrastructure not in our compliance boundary. Only Lambda code and configuration</li>
				<li><strong>Traceability:</strong> Git commits linked to requirements. Code reviews documented in PR comments</li>
				<li><strong>Testing:</strong> Jest test coverage reports became verification evidence</li>
				<li><strong>Architecture docs:</strong> Event-driven diagrams showing Lambda interactions with AWS services</li>
				<li><strong>Audit trail:</strong> CloudWatch Logs provided immutable record of system behavior</li>
			</ul>

			<div class="highlight-box">
				<p><strong>Key Insight:</strong> Serverless architecture actually simplified IEC 62304 compliance by reducing the software we had to document and validate. AWS handled the infrastructure layer, we focused on healthcare domain logic.</p>
			</div>
		</section>
	</CaseStudyLayout>
</div>

<style>
	/* Philips Corporate Brand Styling - Healthcare Design System */
	:global(.philips-corporate) {
		--philips-blue: #0B5ED7;
		--philips-link-blue: #0066a1;
		--philips-text-black: #050505;
		--philips-text-gray: #5d6678;
		--philips-border-gray: #d2d1d4;
		--philips-light-bg: #f5f5f5;

		/* Philips spacing system */
		--philips-spacing-a: 14px;
		--philips-spacing-b: 20px;
		--philips-spacing-c: 34px;
		--philips-spacing-e: 86px;
	}

	/* Typography - Neue Frutiger World fallback stack (Segoe UI is similar) */
	:global(.philips-corporate) :global(section) {
		margin-bottom: var(--philips-spacing-e); /* 86px - Philips generous spacing */
	}

	/* H2 - LIGHT weight for Philips signature airy aesthetic */
	:global(.philips-corporate h2) {
		color: var(--philips-blue);
		font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
		font-weight: 300; /* LIGHT - Philips signature */
		font-size: 48px; /* Larger, lighter headings */
		line-height: 1.2;
		letter-spacing: -0.02em;
		margin-bottom: var(--philips-spacing-c);
	}

	:global(.philips-corporate h3) {
		color: var(--philips-link-blue);
		font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
		font-weight: 400; /* Book weight for h3 */
		font-size: 24px;
		line-height: 1.3;
		letter-spacing: -0.01em;
		margin-top: 28px;
		margin-bottom: var(--philips-spacing-b);
	}

	/* Body text - Book weight (regular) */
	:global(.philips-corporate p) {
		color: var(--philips-text-black);
		font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
		font-weight: 400;
		font-size: 17px;
		line-height: 1.65;
		margin-bottom: var(--philips-spacing-b);
	}

	:global(.philips-corporate ul) {
		color: var(--philips-text-black);
		font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
		font-weight: 400;
		font-size: 17px;
		line-height: 1.65;
		margin-bottom: var(--philips-spacing-b);
	}

	:global(.philips-corporate li) {
		margin-bottom: 12px;
	}

	:global(.philips-corporate a) {
		color: var(--philips-link-blue);
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	:global(.philips-corporate a:hover) {
		color: var(--philips-blue);
		text-decoration: underline;
	}

	:global(.philips-corporate .highlight-box) {
		border-left: 4px solid var(--philips-blue);
		background: var(--philips-light-bg);
		padding: 34px;
		margin: 34px 0;
		border-radius: 2px;
	}

	:global(.philips-corporate .highlight-box h3) {
		margin-top: 0;
		margin-bottom: 16px;
	}

	:global(.philips-corporate .highlight-box p) {
		margin-bottom: 12px;
	}

	:global(.philips-corporate .highlight-box ul) {
		margin-bottom: 0;
	}

	:global(.philips-corporate .highlight-box strong) {
		color: var(--philips-blue);
	}

	:global(.philips-corporate .two-column) {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		margin-bottom: 34px;
	}

	@media (max-width: 768px) {
		:global(.philips-corporate .two-column) {
			grid-template-columns: 1fr;
			gap: 34px;
		}
	}

	:global(.philips-corporate strong) {
		color: var(--philips-blue);
		font-weight: 600; /* Semi-bold, not too heavy */
	}

	/* Code blocks - clean, minimal */
	:global(.philips-corporate code) {
		background: var(--philips-light-bg);
		color: var(--philips-link-blue);
		padding: 3px 8px;
		border-radius: 4px;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		font-size: 0.9em;
	}

	/* Hero section - Light weight title */
	:global(.philips-corporate) :global(.case-title) {
		font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif !important;
		font-weight: 300 !important; /* LIGHT weight for hero */
		letter-spacing: -0.02em !important;
	}

	/* CTA Section - Philips healthcare blue gradient */
	:global(.philips-corporate) :global(.case-cta) {
		background: linear-gradient(135deg, var(--philips-blue) 0%, var(--philips-link-blue) 100%);
	}

	:global(.philips-corporate) :global(.case-cta h2),
	:global(.philips-corporate) :global(.case-cta p) {
		color: #ffffff !important;
	}

	:global(.philips-corporate) :global(.case-cta .cta-button) {
		background: #ffffff;
		color: var(--philips-blue);
		border-radius: 4px; /* Slightly rounded */
		padding: 16px 32px;
		font-family: 'Segoe UI', sans-serif;
		font-weight: 600;
		font-size: 17px;
		border: 2px solid #ffffff;
		transition: all 0.3s ease;
	}

	:global(.philips-corporate) :global(.case-cta .cta-button:hover) {
		background: transparent;
		color: #ffffff;
		border-color: #ffffff;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(11, 94, 215, 0.3);
	}

	/* Tags/Pills - Clean Philips blue */
	:global(.philips-corporate) :global(.pill) {
		background: var(--philips-blue) !important;
		color: #ffffff !important;
		font-family: 'Segoe UI', sans-serif !important;
		font-weight: 500 !important;
		border-radius: 20px !important;
		padding: 10px 20px !important;
		font-size: 0.875rem !important;
		border: none !important;
		letter-spacing: 0.3px !important;
	}

	/* Light, airy aesthetic - generous white space */
	:global(.philips-corporate) :global(.case-content) {
		max-width: 900px;
		margin: 0 auto;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		:global(.philips-corporate h2) {
			font-size: 32px;
		}

		:global(.philips-corporate h3) {
			font-size: 20px;
		}
	}
</style>
