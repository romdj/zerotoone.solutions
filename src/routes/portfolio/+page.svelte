<script>
	const sideProjects = [
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
			<h1 class="hero-title brand-gradient-text">Side Projects</h1>
			<p class="hero-subtitle">Personal projects, experiments, and creative endeavors that spark innovation</p>
		</div>
	</section>

	<!-- Side Projects Section -->
	<section style="margin-bottom: 4rem;">
		<h2 style="font-size: 2rem; font-weight: 600; text-align: center; margin-bottom: 3rem; color: #1a1a1a;">
			Personal Projects & Experiments
		</h2>
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; max-width: 72rem; margin: 0 auto;">
			{#each sideProjects as project}
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

</main>