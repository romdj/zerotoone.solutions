<script lang="ts">
	import '$lib/styles/homepage.css';
	import { onMount } from 'svelte';

	onMount(() => {
		// Generate path data from mathematical functions
		const generatePath = (fn: (x: number) => number, xMin: number, xMax: number, steps: number) => {
			const points: string[] = [];
			for (let i = 0; i <= steps; i++) {
				const x = xMin + (xMax - xMin) * (i / steps);
				const y = fn(x);
				points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(3)},${(-y).toFixed(3)}`); // Negative y for SVG coords
			}
			return points.join(' ');
		};

		// Bad: ln(x+1)
		const badPath = generatePath((x) => Math.log(x + 1), -1, 6, 150);
		const badPathElement = document.getElementById('bad-path');
		if (badPathElement) badPathElement.setAttribute('d', badPath);

		// Good: -1 + x + sin(x + π/2)
		const goodPath = generatePath((x) => -1 + x + Math.sin(x + Math.PI/2), -1, 6, 150);
		const goodPathElement = document.getElementById('good-path');
		if (goodPathElement) goodPathElement.setAttribute('d', goodPath);
	});
</script>

<svelte:head>
	<title>Zero to One Solutions — Simplicity at Scale</title>
	<meta name="description" content="Complex challenges deserve elegant solutions. By turning ideas into actionable plans, we connect vision to delivery.">
</svelte:head>

<!-- Wireframe Reference -->
<div style="max-width: 1200px; margin: 2rem auto; padding: 1rem; background: #f0f0f0; border-radius: 12px;">
	<h2 style="margin: 0 0 1rem; font-family: Inter, sans-serif; color: #333;">Wireframe Reference</h2>
	<img src="/assets/Images/inspiration/zerotoone.solutions-home.png" alt="Wireframe reference" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</div>

<div class="wrap">
	<!-- Hero -->
	<main class="hero" id="home">
		<section>
			<h1>Simplicity at Scale</h1>
			<p class="tag">Complex challenges deserve elegant solutions.</p>
			<p class="lead">By turning ideas into actionable plans,<br>we connect vision to delivery.</p>
			<a class="cta" href="/contact" aria-label="Get in touch to start a project">
				Get in Touch
			</a>
		</section>

		<!-- Right column intentionally empty to respect the original composition -->
		<aside aria-hidden="true"></aside>

		<!-- Progress curves - Mathematical visualization -->
		<div class="progress-curves" aria-hidden="true">
			<svg viewBox="-1 -4.33 7 6.5" preserveAspectRatio="xMidYMid meet" role="img">
				<defs>
					<!-- Gradient for "good" architecture path -->
					<linearGradient id="good-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#8333C5" stop-opacity="0.9"/>
						<stop offset="50%" stop-color="#F11759" stop-opacity="0.95"/>
						<stop offset="100%" stop-color="#D67D21" stop-opacity="0.9"/>
					</linearGradient>
				</defs>

				<!-- Bad path: ln(x+1) - logarithmic slow growth -->
				<path id="bad-path" fill="none" stroke="#999999" stroke-width="0.18" stroke-linecap="round" stroke-linejoin="round" opacity="0.65"/>

				<!-- Good path: -1 + x + sin(x + π/2) - elegant growth -->
				<path id="good-path" fill="none" stroke="url(#good-gradient)" stroke-width="0.21" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</main>
</div>