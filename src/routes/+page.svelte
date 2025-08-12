<script lang="ts">
	import '$lib/styles/homepage.css';
</script>

<svelte:head>
	<title>Zero to One Solutions — Simplicity at Scale</title>
	<meta name="description" content="Complex challenges deserve elegant solutions. By turning ideas into actionable plans, we connect vision to delivery.">
</svelte:head>

<div class="wrap">
	<!-- Hero -->
	<main class="hero" id="home">
		<section>
			<h1>Simplicity at Scale</h1>
			<p class="tag">Complex challenges deserve elegant solutions.</p>
			<p class="lead">By turning ideas into actionable plans, we connect vision to delivery — designing architectures that are clear to understand, simple to maintain, and ready to grow.</p>
			<a class="cta" href="#contact" aria-label="Get in touch to start a project">
				Get in touch
				<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
		</section>

		<!-- Right column intentionally empty to respect the original composition -->
		<aside aria-hidden="true"></aside>

		<!-- Serpentine accent -->
		<div class="serpentine" aria-hidden="true">
			<svg viewBox="0 0 1100 260" preserveAspectRatio="xMidYMid meet" role="img">
				<defs>
					<linearGradient id="g-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#8333C5"/>
						<stop offset="55%" stop-color="#F11759"/>
						<stop offset="100%" stop-color="#D67D21"/>
					</linearGradient>
				</defs>
				<!-- Smooth serpentine path (rounded caps/joins) -->
				<path d="M0,200 
						 C120,200 160,60 280,60
						 C400,60 440,200 560,200
						 C680,200 720,60 840,60
						 C960,60 1000,200 1120,200"
					  fill="none"
					  stroke="url(#g-stroke)"
					  stroke-width="26"
					  stroke-linecap="round"
					  stroke-linejoin="round"/>
			</svg>
		</div>
	</main>
</div>