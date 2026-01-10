<script lang="ts">
	import '$lib/styles/homepage.css';
	import { contactConfig } from '$lib/config/contact';
	import { onMount } from 'svelte';

	// Load Calendly widget script
	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://assets.calendly.com/assets/external/widget.js';
		script.async = true;
		document.head.appendChild(script);
	});
</script>

<svelte:head>
	<title>Contact - Zero to One Solutions</title>
	<meta name="description" content="Get in touch to discuss how we can help transform your business challenges into elegant solutions. Enterprise consulting, startup incubation, or technical collaboration.">
	<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="container">
		<h1 class="hero-headline">
			<span class="gradient-text">Let's Work Together</span>
		</h1>
		<p class="hero-subheadline">
			Choose the path that fits your needs
		</p>
		<p class="hero-description">
			Whether you're transforming enterprise architecture, launching a startup,<br class="desktop-break">
			or looking for technical collaboration—we're here to help
		</p>
	</div>
</section>

<!-- Contact Paths Grid -->
<section class="what-we-do">
	<div class="container">
		<h2 class="section-heading">How Can We Help?</h2>
		<div class="service-grid" style="margin-top: 3rem;">
			<div class="card-brand animate-float">
				<div style="font-size: 3rem; margin-bottom: 1rem;">🏢</div>
				<h3 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem;">
					Enterprise Solutions
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
					Ready to modernize your architecture, build cloud-native platforms, or scale your
					technical teams? Let's discuss enterprise-grade solutions.
				</p>
				<div style="margin-bottom: 1rem;">
					<a href="mailto:{contactConfig.emails.enterprise}" class="cta-button" style="display: inline-block; text-decoration: none;">
						Schedule Consultation
					</a>
				</div>
				<p style="font-size: 0.875rem; color: var(--text-secondary);">
					<strong>Email:</strong> {contactConfig.emails.enterprise}
				</p>
			</div>

			<div class="card-brand animate-float animate-delay-100">
				<div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
				<h3 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem;">
					Startup Incubator
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
					Building your MVP or need technical strategy from zero to one? We help startups
					make the right technical decisions from day one.
				</p>
				<div style="margin-bottom: 1rem;">
					<a href="/in-house" class="cta-button" style="display: inline-block; text-decoration: none;">
						Learn About In-House Services
					</a>
				</div>
				<p style="font-size: 0.875rem; color: var(--text-secondary);">
					<strong>Email:</strong> {contactConfig.emails.startups}
				</p>
			</div>

			<div class="card-brand animate-float animate-delay-200">
				<div style="font-size: 3rem; margin-bottom: 1rem;">🎤</div>
				<h3 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem;">
					Speaking & Collaboration
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 2rem;">
					Technical talks, advisory roles, hiring opportunities, or community collaborations.
					Let's explore how we can work together.
				</p>
				<div style="margin-bottom: 1rem;">
					<a href="mailto:{contactConfig.emails.general}" class="cta-button" style="display: inline-block; text-decoration: none;">
						Get In Touch
					</a>
				</div>
				<p style="font-size: 0.875rem; color: var(--text-secondary);">
					<strong>Email:</strong> {contactConfig.emails.general}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Calendar Booking Section -->
<section class="what-we-do" style="background: var(--bg-secondary, #f8f9fa);">
	<div class="container">
		<h2 class="section-heading">Schedule a Consultation</h2>
		<p class="section-description">
			Book time directly on my calendar for a focused discussion
		</p>
		<div style="margin-top: 3rem; max-width: 64rem; margin-left: auto; margin-right: auto;">
			<!-- Calendly inline widget -->
			<div
				class="calendly-inline-widget"
				data-url={contactConfig.calendly.general}
				style="min-width:320px;height:700px;"
			></div>
		</div>
		<div style="margin-top: 2rem; text-align: center;">
			<p style="font-size: 0.875rem; color: var(--text-secondary);">
				<strong>Timezone:</strong> {contactConfig.office.timezone}
			</p>
		</div>
	</div>
</section>

<!-- Direct Contact Details -->
<section class="what-we-do">
	<div class="container">
		<h2 class="section-heading">Or Reach Out Directly</h2>
		<p class="section-description">
			I typically respond within {contactConfig.office.responseTime}
		</p>
		<div class="work-grid" style="margin-top: 3rem; max-width: 56rem; margin-left: auto; margin-right: auto;">
			<div class="card">
				<h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">
					Email
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
					The best way to get in touch for detailed discussions
				</p>
				<a href="mailto:{contactConfig.emails.general}" style="color: var(--gradient-primary); font-weight: 600; text-decoration: none;">
					{contactConfig.emails.general}
				</a>
			</div>

			<div class="card">
				<h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">
					GitHub
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
					Explore open-source contributions and technical work
				</p>
				<a href={contactConfig.social.github} target="_blank" rel="noopener noreferrer" style="color: var(--gradient-primary); font-weight: 600; text-decoration: none;">
					{contactConfig.social.github.replace('https://', '')} →
				</a>
			</div>
		</div>
		<div style="margin-top: 3rem; text-align: center;">
			<p style="font-size: 0.875rem; color: var(--text-secondary);">
				<strong>Office Hours:</strong> {contactConfig.office.hours}
			</p>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="what-we-do" style="background: var(--bg-secondary, #f8f9fa);">
	<div class="container">
		<h2 class="section-heading">Common Questions</h2>
		<div class="service-grid" style="margin-top: 3rem; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
			<div class="card">
				<h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.75rem;">
					What's your typical response time?
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.9375rem;">
					I respond to all inquiries within 24 hours during business days. For urgent matters,
					mark your email as high priority.
				</p>
			</div>

			<div class="card">
				<h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.75rem;">
					Do you work with startups?
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.9375rem;">
					Absolutely! Check out our <a href="/in-house" style="color: var(--gradient-primary);">In-House Services</a>
					designed specifically for early-stage companies and startups.
				</p>
			</div>

			<div class="card">
				<h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.75rem;">
					What types of projects do you take on?
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.9375rem;">
					Enterprise architecture, cloud-native platforms, legacy modernization, technical leadership,
					and strategic advisory. View <a href="/work" style="color: var(--gradient-primary);">our work</a> for examples.
				</p>
			</div>

			<div class="card">
				<h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.75rem;">
					Where are you located?
				</h3>
				<p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.9375rem;">
					Based in Brussels, Belgium (CET/CEST timezone). I work with clients globally,
					both on-site and remotely.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Final CTA Section -->
<section class="final-cta">
	<div class="container">
		<h2 class="cta-heading">Not Sure Which Path to Choose?</h2>
		<p class="cta-subtext">
			Start with a general inquiry and we'll guide you to the right solution
		</p>
		<div class="cta-buttons">
			<a href="mailto:{contactConfig.emails.general}" class="cta-button-white">
				Send General Inquiry
			</a>
			<a href="/work" class="cta-button-outline">
				View Our Work First
			</a>
		</div>
	</div>
</section>
