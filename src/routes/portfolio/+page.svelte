<script>
	const enterpriseTransformations = [
		{
			company: "Nike",
			role: "Lead Software Engineer / Solution Architect",
			period: "2022.12 - 2023.12",
			project: "Supply Chain Technology Platform",
			description: "Led a team of 12 to build an event-driven platform for Nike's Supply Chain Technology, integrating SAP S4/HANA and other logistics systems.",
			achievements: ["Event-driven architecture", "SAP S4/HANA integration", "Team leadership (12 people)", "Supply chain optimization"],
			tech: ["SAFe", "SCRUM", "Event-driven", "SAP", "Microservices"]
		},
		{
			company: "ABVV-FGTB",
			role: "Application Solution Architect",
			period: "2024.01 - 2024.06",
			project: "AS400 Mainframe Modernization",
			description: "Led the modernization of a 30-year-old AS400 Mainframe application for Belgium's largest trade union federation.",
			achievements: ["30-year legacy system transformation", "New data models and security layers", "Keycloak & Active Directory integration", "Stakeholder management"],
			tech: ["AS400", "Keycloak", "Active Directory", "Data Modeling", "Security"]
		},
		{
			company: "Extra Horizon",
			role: "Solution Architect / Software Engineer",
			period: "2021.01 - 2022.06",
			project: "Healthcare Backend-as-a-Service Platform",
			description: "Designed and developed a medically compliant Backend-as-a-Service platform enabling healthcare product development.",
			achievements: ["Medical compliance (FHIR)", "Microservices with TDD", "100% test coverage", "Healthcare platform architecture"],
			tech: ["Healthcare", "BaaS", "FHIR", "TDD", "Microservices"]
		},
		{
			company: "IBM",
			role: "Solution Architect",
			period: "2022.06 - 2022.12",
			project: "IoT Solutions & Data Pipelines",
			description: "Designed integrated IoT solutions and created data pipelines for automated energy reports and analysis.",
			achievements: ["Integrated IoT solution design", "Automated energy reporting", "Data pipeline architecture", "Client technical analysis"],
			tech: ["IoT", "Data Pipelines", "Energy Analytics", "Solution Design"]
		},
		{
			company: "Philips",
			role: "Software Engineer",
			period: "2018.07 - 2020.09",
			project: "HealthSuite Digital Platform",
			description: "Developed platform services for Philips' comprehensive healthcare cloud platform serving hospital environments.",
			achievements: ["AWS services implementation", "Device management systems", "Firmware distribution", "Healthcare platform services"],
			tech: ["AWS", "Healthcare", "Device Management", "Cloud Services"]
		}
	];

	const innovationProjects = [
		{
			name: "3-Point NHL Standing System",
			link: "https://github.com/romdj/3point-game-nhl-standing",
			description: "Simulation of what-if the NHL adopted the 3-point game system used in international hockey (IIHF).",
			tech: ["Vue.js", "Node.js", "Sports Analytics"],
			type: "Analytics & Simulation"
		},
		{
			name: "Photography Studio",
			link: "#",
			description: "Creative visual storytelling through photography - demonstrating aesthetic sense and attention to detail.",
			tech: ["Photography", "Visual Design", "Creative Arts"],
			type: "Creative Portfolio"
		},
		{
			name: "Eindhoven Technology Meetup",
			link: "https://www.meetup.com/Eindhoven-Technology-Meetup-Group/",
			description: "Founded and co-organized technology meetup group fostering innovation and networking in the Eindhoven tech community.",
			tech: ["Community Building", "Event Organization", "Networking"],
			type: "Community Leadership"
		}
	];
</script>

<main class="hero-light" style="padding: 2rem; min-height: 100vh;">
	<section class="hero-section">
		<div class="hero-content">
			<h1 class="hero-title brand-gradient-text">Portfolio</h1>
			<p class="hero-subtitle">Enterprise transformations and innovative solutions across major corporations</p>
		</div>
	</section>

	<!-- Enterprise Transformations Section -->
	<section style="margin-bottom: 4rem;">
		<h2 style="font-size: 2rem; font-weight: 600; text-align: center; margin-bottom: 3rem; color: #1a1a1a;">
			Enterprise Transformations
		</h2>
		<div style="display: grid; gap: 2rem; max-width: 80rem; margin: 0 auto;">
			{#each enterpriseTransformations as project}
				<div class="card card-brand">
					<div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
						<div>
							<h3 style="font-size: 1.5rem; font-weight: 700; color: #F11759; margin-bottom: 0.25rem;">{project.company}</h3>
							<p style="color: #8333C5; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">{project.role}</p>
							<p style="color: #666; font-size: 0.85rem;">{project.period}</p>
						</div>
					</div>
					
					<h4 style="font-size: 1.1rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1rem;">{project.project}</h4>
					<p style="color: #4a5568; margin-bottom: 1.5rem; line-height: 1.6;">{project.description}</p>
					
					<div style="margin-bottom: 1.5rem;">
						<h5 style="font-size: 0.9rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">Key Achievements</h5>
						<ul style="list-style: none; padding: 0; margin: 0;">
							{#each project.achievements as achievement}
								<li style="color: #4a5568; margin-bottom: 0.25rem; padding-left: 1rem; position: relative;">
									<span style="position: absolute; left: 0; color: #F11759;">✓</span>
									{achievement}
								</li>
							{/each}
						</ul>
					</div>
					
					<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
						{#each project.tech as tech}
							<span style="background: linear-gradient(135deg, #F11759, #8333C5); color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">{tech}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Innovation & Side Projects Section -->
	<section style="margin-bottom: 4rem;">
		<h2 style="font-size: 2rem; font-weight: 600; text-align: center; margin-bottom: 3rem; color: #1a1a1a;">
			Innovation & Side Projects
		</h2>
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; max-width: 72rem; margin: 0 auto;">
			{#each innovationProjects as project}
				<div class="card">
					<div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
						<h3 style="font-size: 1.25rem; font-weight: 600; color: #1a1a1a;">{project.name}</h3>
						<span style="background: #f7fafc; color: #8333C5; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">{project.type}</span>
					</div>
					<p style="color: #4a5568; margin-bottom: 1.5rem; line-height: 1.6;">{project.description}</p>
					<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
						{#each project.tech as tech}
							<span style="background: #f7fafc; color: #4a5568; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;">{tech}</span>
						{/each}
					</div>
					<a href={project.link} style="color: #F11759; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">
						{project.link.startsWith('http') ? 'View Project →' : 'View Portfolio →'}
					</a>
				</div>
			{/each}
		</div>
	</section>

	<!-- GitHub Link Section -->
	<section class="cta-section">
		<div class="cta-card card-brand">
			<h2 class="cta-title">Explore More Projects</h2>
			<p class="cta-text">
				Discover additional projects, code samples, and technical contributions on GitHub.
			</p>
			<a href="https://github.com/romdj" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
				View GitHub Profile →
			</a>
		</div>
	</section>

	<nav class="nav-back">
		<a href="/" class="btn btn-secondary">← Home</a>
	</nav>
</main>