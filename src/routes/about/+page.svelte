<script lang="ts">
	import '$lib/styles/homepage.css';
</script>

<svelte:head>
	<title>About - Zero to One Solutions</title>
	<meta name="description" content="Learn about our approach to transforming complex business challenges into elegant, scalable solutions through multidisciplinary expertise.">
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="container">
		<h1 class="hero-headline">
			<span class="gradient-text">About Zero to One</span>
		</h1>
		<p class="hero-subheadline">
			Transforming complexity into clarity
		</p>
		<p class="hero-description">
			We combine technological know-how, enterprise expertise,<br class="desktop-break">
			and design thinking to create solutions that last
		</p>
	</div>
</section>

<!-- Company Story Section -->
<section class="what-we-do">
	<div class="container">
		<h2 class="section-heading">Our Story</h2>
		<div class="section-description" style="max-width: 48rem; margin: 0 auto;">
			<p style="margin-bottom: 1.5rem;">
				Zero to One Solutions was born from years of experience transforming enterprise architectures
				at scale. Working with companies like Nike, IBM, and Philips, we've seen firsthand how the
				right technical strategy can unlock exponential value.
			</p>
			<p style="margin-bottom: 1.5rem;">
				We believe that great solutions emerge at the intersection of deep technical expertise and
				creative problem-solving. That's why we approach every challenge with a multidisciplinary
				mindset—drawing from software engineering, design thinking, and real-world operational experience.
			</p>
			<p>
				Whether modernizing legacy systems, building cloud-native platforms, or leading technical teams,
				we focus on one thing: creating solutions that deliver long-term value for the businesses and
				people who depend on them.
			</p>
		</div>
	</div>
</section>

<!-- Core Values Grid -->
<section class="what-we-do" style="background: var(--bg-secondary, #f8f9fa);">
	<div class="container">
		<h2 class="section-heading">What Drives Us</h2>
		<div class="service-grid" style="margin-top: 3rem;">
			<div class="card animate-float">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">
					Multidisciplinary Approach
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6;">
					We don't just write code—we solve problems. By combining technical expertise with
					design thinking, engineering principles, and creative problem-solving, we find solutions
					others miss.
				</p>
			</div>

			<div class="card animate-float animate-delay-100">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">
					Enterprise Excellence
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6;">
					8+ years working with Fortune 500 companies has taught us what it takes to deliver
					at scale. We bring enterprise-grade architecture, reliability, and security to every project.
				</p>
			</div>

			<div class="card animate-float animate-delay-200">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">
					Design Thinking
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6;">
					Beautiful architecture starts with understanding the people who use it. We approach
					every challenge with empathy, iteration, and a focus on creating experiences that delight.
				</p>
			</div>

			<div class="card animate-float animate-delay-300">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">
					Long-term Partnerships
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6;">
					We're not looking for quick wins. We build relationships and solutions designed to
					grow with your business, delivering compounding value over years, not months.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Expertise Showcase -->
<section class="what-we-do">
	<div class="container">
		<h2 class="section-heading">What We Bring</h2>
		<p class="section-description">
			Deep expertise across the full technology stack
		</p>
		<div class="capability-pills" style="margin-top: 2rem;">
			<span class="pill">Solution Architecture</span>
			<span class="pill">Software Engineering</span>
			<span class="pill">AI & Machine Learning</span>
			<span class="pill">Technology Leadership</span>
			<span class="pill">Cloud Native Architecture</span>
			<span class="pill">Event-Driven Systems</span>
			<span class="pill">Microservices & APIs</span>
			<span class="pill">DevOps & Platform Engineering</span>
			<span class="pill">Data Engineering</span>
			<span class="pill">Legacy Modernization</span>
		</div>
	</div>
</section>

<!-- Beyond Architecture Section -->
<section class="what-we-do" style="background: var(--bg-secondary, #f8f9fa);">
	<div class="container">
		<h2 class="section-heading">Beyond the Code</h2>
		<p class="section-description">
			Our multidisciplinary interests inform how we solve problems
		</p>
		<div class="interest-grid" style="margin-top: 3rem;">
			<div class="card-brand">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">
					📷 Photography
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
					Creative direction and visual storytelling through <strong>tempsdarret.studio</strong>,
					bringing an artist's eye to technical work.
				</p>
			</div>

			<div class="card-brand">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">
					⚙️ Engineering Research
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
					Deep-dive into 3D CAD design, composite materials, and aerodynamics—applying
					engineering principles beyond software.
				</p>
			</div>

			<div class="card-brand">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">
					🤝 Community Leadership
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
					BECI member, founder of Eindhoven Tech Meetup, and active in gaming communities—
					building networks that matter.
				</p>
			</div>

			<div class="card-brand">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">
					🏃 Athletics
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
					Triathlon, skiing, and cycling—discipline, endurance, and continuous improvement
					in every pursuit.
				</p>
			</div>

			<div class="card-brand">
				<h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">
					☕ Culinary Arts
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
					Coffee roasting and high-end cooking—precision, craft, and the joy of creating
					exceptional experiences.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Final CTA Section -->
<section class="final-cta">
	<div class="container">
		<h2 class="cta-heading">Ready to Transform Your Vision?</h2>
		<p class="cta-subtext">
			Let's explore how multidisciplinary thinking can unlock your next breakthrough
		</p>
		<div class="cta-buttons">
			<a href="/work" class="cta-button-white">
				View Our Work
			</a>
			<a href="/contact" class="cta-button-outline">
				Get In Touch
			</a>
		</div>
	</div>
</section>
