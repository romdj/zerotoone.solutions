<script lang="ts">
	import CaseStudyLayout from '$lib/components/CaseStudyLayout.svelte';

	export let data;
</script>

<svelte:head>
	<title>Elia - Enterprise Architecture Transformation | Zero to One Solutions</title>
	<meta name="description" content="How architectural standards spread through Belgium's energy grid operator. From skeptical pilot to organization-wide adoption across 3 platform transformations." />
</svelte:head>

<CaseStudyLayout
	company="Elia Group"
	logo="/logos/ELIA_GROUP.svg"
	title="Enterprise Architecture Transformation"
	role="Solution Architect (Enterprise Level)"
	tags={['Enterprise Architecture', 'API Standards', 'Cloud Platforms', 'Organizational Change', 'Innovation Diffusion']}
	headerImage={data.headerImage}
>
	<!-- The Context -->
	<section>
		<h2>The Context</h2>
		<p>
			Elia Group operates Belgium's high-voltage electricity transmission grid. Critical infrastructure. 24/7 operations. Zero tolerance for downtime. In this environment, "enterprise architecture" was often seen as bureaucracy—documentation that slowed delivery without adding value.
		</p>
		<p>
			Each platform team had their own approach. APIs designed differently. Integration patterns unique to each project. Documentation inconsistent or absent. Cloud adoption ad-hoc. When developers moved between teams, they started from scratch.
		</p>

		<div class="highlight-box">
			<p><strong>The Challenge:</strong> How do you introduce architectural discipline into an organization that views it as overhead? How do standards spread when teams operate independently? Can architecture evolve from cost center to competitive advantage?</p>
		</div>

		<p>
			The answer: one team at a time. One standard that demonstrates value. One win that creates champions. This is the story of how architectural thinking diffused through Elia—from skeptical pilot to organizational default.
		</p>
	</section>

	<!-- The Pilot -->
	<section>
		<h2>The Pilot: Architecture Working Group</h2>
		<p>
			We started small. Not organization-wide mandates. Not heavyweight processes. Just a working group—architects from different domains coming together to ask: what if we had consistent API standards?
		</p>

		<h3>Initial Skepticism</h3>
		<p>
			The response from development teams was predictable:
		</p>
		<ul>
			<li><strong>"We're already delivering features"</strong> - Why add process overhead?</li>
			<li><strong>"Every project is different"</strong> - Standards will constrain our unique needs</li>
			<li><strong>"Documentation gets outdated"</strong> - Time spent on docs is time not coding</li>
			<li><strong>"Cloud decisions are technical"</strong> - Teams know their requirements best</li>
		</ul>

		<p>
			Fair concerns. We'd seen heavyweight enterprise architecture fail before—lengthy approval processes, architecture diagrams divorced from reality, standards that made sense in theory but broke in practice.
		</p>

		<h3>Limited Scope: API Guidelines First</h3>
		<p>
			We chose our first battle carefully. Not "enterprise-wide architectural governance." Just: <strong>Can we agree on how APIs should be designed?</strong>
		</p>
		<ul>
			<li><strong>RESTful conventions:</strong> Resource naming, HTTP verbs, status codes</li>
			<li><strong>Error handling:</strong> Consistent error response format</li>
			<li><strong>Versioning strategy:</strong> How to evolve APIs without breaking consumers</li>
			<li><strong>Authentication patterns:</strong> OAuth2 flows for different use cases</li>
		</ul>

		<p>
			Critically: these weren't mandates. They were <em>proposals</em>. The working group drafted guidelines, then asked one team to try them: <strong>Customer Centricity Platform</strong>.
		</p>

		<h3>The Early Adopters</h3>
		<p>
			Customer Centricity was a new platform—cloud-native, Kubernetes-based, serving Elia's external stakeholders. The team was already facing API design questions. Our guidelines gave them answers without inventing from scratch.
		</p>
		<p>
			They tried the standards. We iterated based on their feedback. When they hit edge cases, we refined the guidelines. The key: <strong>standards evolved with real implementation, not in ivory tower</strong>.
		</p>
	</section>

	<!-- The Early Wins -->
	<section>
		<h2>The Early Wins: Demonstrating Value</h2>
		<p>
			Six months into Customer Centricity implementation, something unexpected happened. The business asked for architectural documentation—not because we required it, but because <strong>they wanted to understand what they were building</strong>.
		</p>

		<h3>Documentation That Actually Helped</h3>
		<p>
			The problem: Customer Centricity had grown complex. Kubernetes, .NET microservices, Azure integrations, legacy system connections. New developers took weeks to understand the landscape. Business stakeholders couldn't visualize how pieces fit together.
		</p>
		<p>
			We introduced <strong>Solution Architecture Documentation (SAD)</strong>—not heavyweight UML, but pragmatic diagrams:
		</p>
		<ul>
			<li><strong>System context:</strong> External integrations visualized in Archimate</li>
			<li><strong>Component architecture:</strong> How services communicated (event-driven patterns)</li>
			<li><strong>Data flows:</strong> Customer data journey through the platform</li>
			<li><strong>Deployment architecture:</strong> Kubernetes structure, Azure resources</li>
		</ul>

		<h3>The Metric That Convinced</h3>
		<p>
			Developer onboarding time: <strong>3 weeks → 5 days</strong>. New team members could read the SAD, understand the system, and start contributing. The documentation wasn't overhead—it was <em>efficiency multiplier</em>.
		</p>
		<p>
			Business stakeholders used the diagrams in planning sessions. Architecture reviews surfaced integration issues before code was written. API consumers could understand endpoints from consistent documentation.
		</p>

		<h3>Champions Emerged</h3>
		<p>
			Customer Centricity developers became advocates. When other teams asked "how did you design your APIs?", they shared the guidelines. When asked about their architecture, they showed the SAD template.
		</p>
		<p>
			We didn't push adoption. <strong>Teams pulled the standards because they saw them working.</strong>
		</p>

		<div class="highlight-box">
			<p><strong>The Turning Point:</strong> Architecture shifted from "compliance requirement" to "team enabler". Standards weren't constraints—they were accelerators. Documentation wasn't bureaucracy—it was communication tool.</p>
		</div>
	</section>

	<!-- The Adoption Curve -->
	<section>
		<h2>The Adoption Curve: Spreading Across Teams</h2>
		<p>
			Success creates demand. Two more platform teams approached us: ADEMAR (Capacity Remuneration Mechanism) and BSPM (Balancing Service Provider Market). Different domains, different technical needs, but same question: <strong>Can we use your standards?</strong>
		</p>

		<h3>Second Wave: ADEMAR</h3>
		<p>
			ADEMAR was existing applications—not greenfield like Customer Centricity. Legacy code. Point-to-point integrations. No consistent API patterns. The challenge: <strong>applying standards to brownfield</strong>.
		</p>

		<h4>Customization for Context</h4>
		<p>
			ADEMAR couldn't adopt guidelines wholesale. They needed:
		</p>
		<ul>
			<li><strong>Migration path:</strong> Gradual API standardization, not big-bang rewrite</li>
			<li><strong>Hub-and-spoke refactoring:</strong> Central integration hub removing N-squared integrations</li>
			<li><strong>Messaging patterns:</strong> Event-driven architecture for market processes</li>
		</ul>

		<p>
			We adapted the standards. Created <strong>messaging guidelines</strong> alongside API guidelines. Introduced <strong>Architecture Tradeoff Analysis Method (ATAM)</strong> to evaluate migration options. Documented the existing mess before designing the future state.
		</p>

		<h4>The ADEMAR Outcome</h4>
		<p>
			ADEMAR didn't just adopt standards—they <em>contributed back</em>. Their messaging patterns became part of organization-wide guidelines. Their migration approach became template for other legacy modernizations.
		</p>

		<h3>Third Wave: BSPM (Greenfield with Standards)</h3>
		<p>
			BSPM was greenfield—new platform for German market domain. Unlike Customer Centricity (which pioneered standards), BSPM could <strong>start with standards from day one</strong>.
		</p>

		<h4>Quality-First from Design</h4>
		<p>
			BSPM's solution design incorporated standards before coding started:
		</p>
		<ul>
			<li><strong>Data products foundation:</strong> Leveraging organization-wide data models</li>
			<li><strong>API-first design:</strong> APIs designed to guidelines before implementation</li>
			<li><strong>CQRS pattern:</strong> Command-query separation from architecture phase</li>
			<li><strong>Architecture Decision Records:</strong> Decisions documented as made, not retroactively</li>
		</ul>

		<p>
			The difference was striking. BSPM's development was <em>faster</em> because they weren't inventing patterns—they were implementing proven approaches. Integration with other Elia systems was <em>easier</em> because APIs followed same conventions.
		</p>

		<h3>Resistance Overcome</h3>
		<p>
			Not every team adopted immediately. Some continued custom approaches. But resistance softened when:
		</p>
		<ul>
			<li><strong>Integration became friction:</strong> Non-standard APIs required custom client code every time</li>
			<li><strong>Developer mobility hit walls:</strong> Moving between teams meant learning different conventions</li>
			<li><strong>Architecture reviews surfaced issues:</strong> Lack of documentation made risk assessment impossible</li>
		</ul>

		<p>
			We didn't force compliance. We made adoption the path of least resistance.
		</p>
	</section>

	<!-- The Standardization -->
	<section>
		<h2>The Standardization: Becoming the New Normal</h2>
		<p>
			With three successful platforms using architecture standards, Elia formalized what had been emergent practice. Standards moved from "working group experiment" to "organizational default."
		</p>

		<h3>Guidelines Established</h3>
		<p>
			The architecture working group published organization-wide standards:
		</p>
		<ul>
			<li><strong>API Guidelines:</strong> RESTful design, versioning, authentication, error handling</li>
			<li><strong>Messaging Guidelines:</strong> Event schemas, pub-sub patterns, message brokers</li>
			<li><strong>Integration Patterns:</strong> Hub-and-spoke, API gateway, event-driven architecture</li>
			<li><strong>Cloud Adoption Principles:</strong> Kubernetes standards, Azure resource conventions</li>
			<li><strong>Security Standards:</strong> Authentication modules, user lifecycle management, access control</li>
		</ul>

		<h3>Processes Formalized</h3>
		<p>
			Beyond technical guidelines, we established architecture processes:
		</p>
		<ul>
			<li><strong>RACI Matrix:</strong> When architects get involved (informed, consulted, responsible)</li>
			<li><strong>Solution Architecture Documentation (SAD):</strong> Template and review process</li>
			<li><strong>Architecture Tradeoff Analysis Method (ATAM):</strong> Decision framework for major choices</li>
			<li><strong>Architecture Decision Records (ADRs):</strong> Lightweight decision documentation</li>
		</ul>

		<h3>Governance Without Bureaucracy</h3>
		<p>
			Critical balance: standards without slowing delivery. We avoided:
		</p>
		<ul>
			<li><strong>❌ Architecture approval gates:</strong> Teams didn't wait for architect sign-off to start</li>
			<li><strong>❌ Mandatory documentation:</strong> SAD required only for complex/critical platforms</li>
			<li><strong>❌ One-size-fits-all:</strong> Guidelines had escape hatches for justified exceptions</li>
		</ul>

		<p>
			Instead, we embedded architects <em>in</em> teams. Architecture wasn't checkpoint—it was collaboration.
		</p>

		<h3>Tooling Support</h3>
		<p>
			Standards need infrastructure:
		</p>
		<ul>
			<li><strong>Enterprise Architect (Sparx):</strong> Central repository for architecture models</li>
			<li><strong>Miro:</strong> Collaborative architecture design sessions</li>
			<li><strong>Archimate:</strong> Standardized modeling language organization-wide</li>
			<li><strong>LucidChart:</strong> Technical diagrams integrated with documentation</li>
		</ul>

		<div class="highlight-box">
			<h3>Data Architecture Innovation</h3>
			<p>
				Beyond APIs and processes, we established <strong>organization-wide data architecture</strong>:
			</p>
			<ul>
				<li><strong>Data models:</strong> Canonical models for energy domain entities</li>
				<li><strong>Pub-Sub patterns:</strong> Data distribution and synchronization</li>
				<li><strong>CQRS roadmap:</strong> Command-query separation for future platforms</li>
				<li><strong>Data products:</strong> Reusable data services (BSPM leveraged for foundation)</li>
			</ul>
		</div>
	</section>

	<!-- The Cultural Shift -->
	<section>
		<h2>The Cultural Shift: How Thinking Changed</h2>
		<p>
			The real transformation wasn't technical—it was cultural. How Elia <em>thought</em> about building software evolved.
		</p>

		<h3>New Defaults</h3>
		<p>
			What changed in how teams approached new projects:
		</p>
		<ul>
			<li><strong>Before:</strong> "Let's design our APIs." <strong>After:</strong> "Are we following the API guidelines?"</li>
			<li><strong>Before:</strong> "How should we integrate with X?" <strong>After:</strong> "What's the standard integration pattern?"</li>
			<li><strong>Before:</strong> "We'll document it later." <strong>After:</strong> "What's our SAD template?"</li>
			<li><strong>Before:</strong> "Let's pick technologies." <strong>After:</strong> "What's our ATAM analysis showing?"</li>
		</ul>

		<h3>Questions Now Asked</h3>
		<p>
			Architecture reviews shifted from "defend your design" to "how does this fit the ecosystem?":
		</p>
		<ul>
			<li><strong>Reusability:</strong> "Can other teams use this? Should it be a data product?"</li>
			<li><strong>Integration:</strong> "What existing APIs can we consume instead of building?"</li>
			<li><strong>Evolution:</strong> "How will this change when requirements evolve?"</li>
			<li><strong>Documentation:</strong> "Can a new developer understand this in a week?"</li>
		</ul>

		<h3>Quality-First Mindset</h3>
		<p>
			BSPM introduced "quality-first culture"—not just code quality, but architecture quality:
		</p>
		<ul>
			<li>Architecture decisions made explicit (ADRs) not implicit</li>
			<li>Tradeoffs analyzed (ATAM) before commitment</li>
			<li>Documentation treated as code (versioned, reviewed)</li>
			<li>Standards viewed as quality baseline, not constraint</li>
		</ul>

		<h3>Innovation Accelerated</h3>
		<p>
			Paradoxically, standards <em>accelerated</em> innovation:
		</p>
		<ul>
			<li><strong>Time saved:</strong> Teams didn't reinvent patterns, spent time on domain problems</li>
			<li><strong>Integration faster:</strong> Standard APIs meant plug-and-play between systems</li>
			<li><strong>Onboarding shorter:</strong> Developers productive faster with consistent conventions</li>
			<li><strong>Risk lower:</strong> Proven patterns reduced architectural mistakes</li>
		</ul>

		<div class="highlight-box">
			<h3>The Diffusion Metrics</h3>
			<p><strong>3 platform teams adopted standards in 18 months:</strong></p>
			<ul>
				<li><strong>Customer Centricity:</strong> Pioneered API guidelines, SAD template</li>
				<li><strong>ADEMAR:</strong> Extended to messaging patterns, migration approaches</li>
				<li><strong>BSPM:</strong> Greenfield with standards from day one</li>
			</ul>
			<p><strong>Organization-wide impact:</strong></p>
			<ul>
				<li>API and messaging standards adopted by all new projects</li>
				<li>SAD template used across divisions</li>
				<li>ATAM/ADR processes formalized in architecture governance</li>
				<li>Data products mindset spreading to other domains</li>
			</ul>
			<p>
				<strong>Next wave:</strong> Additional teams adopting pattern. Standards becoming reference architecture for Elia Group. The innovation has diffused.
			</p>
		</div>
	</section>

	<!-- Technology Choices & Why -->
	<section>
		<h2>Technology Choices & Why</h2>

		<div class="two-column">
			<div>
				<h3>Architecture Tooling</h3>
				<ul>
					<li><strong>Enterprise Architect (Sparx):</strong> Central repository for architecture models, Archimate support</li>
					<li><strong>Miro:</strong> Collaborative design sessions, workshop facilitation</li>
					<li><strong>Archimate:</strong> Standardized modeling language for enterprise architecture</li>
					<li><strong>LucidChart:</strong> Technical diagrams, integration views</li>
				</ul>
			</div>
			<div>
				<h3>Platform Technologies</h3>
				<ul>
					<li><strong>Kubernetes:</strong> Container orchestration standard across platforms</li>
					<li><strong>Microsoft Azure:</strong> Cloud provider for new platforms</li>
					<li><strong>.NET:</strong> Application framework for Customer Centricity, BSPM</li>
					<li><strong>Event-Driven Architecture:</strong> Messaging backbone for integration</li>
				</ul>
			</div>
		</div>

		<div class="two-column">
			<div>
				<h3>Standards & Patterns</h3>
				<ul>
					<li><strong>RESTful APIs:</strong> Consistent API design organization-wide</li>
					<li><strong>OAuth2:</strong> Authentication standard for APIs</li>
					<li><strong>Pub-Sub Messaging:</strong> Event distribution pattern</li>
					<li><strong>Hub-and-Spoke:</strong> Integration pattern for legacy modernization</li>
				</ul>
			</div>
			<div>
				<h3>Documentation & Governance</h3>
				<ul>
					<li><strong>Solution Architecture Documentation:</strong> Standard template for platforms</li>
					<li><strong>ATAM:</strong> Tradeoff analysis for major decisions</li>
					<li><strong>ADRs:</strong> Lightweight decision records</li>
					<li><strong>RACI Matrix:</strong> Architecture involvement model</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- What We Would Do Differently -->
	<section>
		<h2>What We Would Do Differently</h2>
		<ul>
			<li><strong>Earlier metrics:</strong> Should have measured onboarding time, integration effort from the start to quantify value</li>
			<li><strong>More showcases:</strong> Customer Centricity success should have been demonstrated more widely earlier</li>
			<li><strong>Standard library:</strong> Common code libraries (authentication, logging) should have accompanied API guidelines</li>
			<li><strong>Training program:</strong> Formal training on standards would have accelerated adoption beyond champion-driven diffusion</li>
			<li><strong>Feedback loop:</strong> More structured process for teams to propose standard improvements</li>
		</ul>
	</section>

	<!-- Principles for Innovation Diffusion -->
	<section>
		<h2>Principles for Diffusing Architectural Innovation</h2>
		<p>
			Beyond Elia, these patterns apply to any organization introducing architectural discipline:
		</p>
		<ul>
			<li><strong>Start with pilots, not mandates:</strong> One team proving value beats organization-wide rollout.</li>
			<li><strong>Let success create demand:</strong> Teams pull standards when they see them working, resist when pushed.</li>
			<li><strong>Evolve with implementation:</strong> Standards refined through real use are better than ivory tower designs.</li>
			<li><strong>Quantify value:</strong> "3 weeks → 5 days onboarding" convinces skeptics better than architectural philosophy.</li>
			<li><strong>Champions are multipliers:</strong> Early adopters become advocates. Invest in making them successful.</li>
			<li><strong>Customize for context:</strong> Greenfield and brownfield need different approaches. Rigid standards break.</li>
			<li><strong>Embed, don't gate:</strong> Architects in teams beats architecture approval checkpoints.</li>
			<li><strong>Document decisions, not just designs:</strong> ADRs show <em>why</em>, not just <em>what</em>. Why drives understanding.</li>
			<li><strong>Standards enable, not constrain:</strong> If standards slow teams down, they're wrong. Fix them.</li>
			<li><strong>Culture follows practice:</strong> Don't try to change culture first. Change practices. Culture shifts as result.</li>
		</ul>
	</section>

	<!-- The Pattern Spreads -->
	<section>
		<h2>The Pattern Spreads: Beyond Our Platforms</h2>
		<p>
			The ultimate measure of diffusion isn't adoption—it's when innovation becomes invisible. When "following standards" isn't discussed because it's default behavior.
		</p>

		<h3>Current State at Elia</h3>
		<ul>
			<li><strong>All new platforms:</strong> Start with API guidelines, SAD template, ATAM for major decisions</li>
			<li><strong>Architecture board:</strong> Formalized with RACI matrix, regular reviews</li>
			<li><strong>Data products:</strong> Becoming standard approach for reusable data services</li>
			<li><strong>Cloud adoption:</strong> Kubernetes and Azure patterns consistent across teams</li>
			<li><strong>Security baseline:</strong> Authentication modules, user lifecycle standard</li>
		</ul>

		<h3>The Ripple Effect</h3>
		<p>
			Teams we didn't directly work with adopted patterns:
		</p>
		<ul>
			<li>New projects reference Customer Centricity architecture as template</li>
			<li>ADEMAR's hub-and-spoke migration approach used by other legacy modernizations</li>
			<li>BSPM's quality-first culture spreading to adjacent teams</li>
			<li>Data architecture patterns influencing organization-wide data strategy</li>
		</ul>

		<div class="highlight-box">
			<p><strong>Key Insight:</strong> Architectural transformation isn't technical project—it's organizational change. Standards don't diffuse through documentation. They diffuse through people who've seen them work, hit adoption curve when success becomes visible, and become culture when they're no longer discussed.</p>
		</div>
	</section>
</CaseStudyLayout>
