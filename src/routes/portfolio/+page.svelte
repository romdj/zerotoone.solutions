<script>
	// GitHub integration will be implemented here
	const projects = [
		{
			name: "Project 1",
			description: "Description coming soon",
			github: "#",
			tech: ["TypeScript", "Svelte"]
		},
		{
			name: "Project 2", 
			description: "Description coming soon",
			github: "#",
			tech: ["Python", "FastAPI"]
		}
	];
</script>

<main class="hero-light" style="padding: 2rem; min-height: 100vh;">
	<section class="hero-section">
		<div class="hero-content">
			<h1 class="hero-title brand-gradient-text">Project Portfolio</h1>
			<p class="hero-subtitle">Showcasing technical excellence and innovative solutions</p>
		</div>
	</section>

	<section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; max-width: 72rem; margin: 0 auto 4rem auto;">
		{#each projects as project}
			<div class="card">
				<h3 style="font-size: 1.25rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1rem;">{project.name}</h3>
				<p style="color: #4a5568; margin-bottom: 1.5rem; line-height: 1.6;">{project.description}</p>
				<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
					{#each project.tech as tech}
						<span style="background: #f7fafc; color: #4a5568; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;">{tech}</span>
					{/each}
				</div>
				<a href={project.github} style="color: #F11759; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">View on GitHub →</a>
			</div>
		{/each}
	</section>

	<nav class="nav-back">
		<a href="/" class="btn btn-secondary">← Home</a>
	</nav>
</main>