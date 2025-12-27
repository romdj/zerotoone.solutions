<script>
	export let href;
	export let label;
	export let isActive = false;
	export let isMobile = false;
	export let closeMenu;
	export let isCTA = false;
</script>

<a 
	{href}
	class="nav-link"
	class:active={isActive}
	class:mobile={isMobile}
	class:cta-header={isCTA}
	on:click={closeMenu}
>
	{label}
</a>

<style>
	.nav-link {
		text-decoration: none;
		color: #4a5568;
		font-weight: 500;
		transition: color 0.2s ease, transform 0.2s ease;
		position: relative;
	}

	.nav-link:hover {
		color: #F11759;
		transform: scale(1.02);
	}

	.nav-link.active {
		color: #F11759;
	}

	.nav-link.active:not(.mobile)::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(135deg, #F11759, #8333C5);
		border-radius: 1px;
		animation: slideIn 0.3s ease;
	}

	@keyframes slideIn {
		from {
			transform: scaleX(0);
			opacity: 0;
		}
		to {
			transform: scaleX(1);
			opacity: 1;
		}
	}

	.nav-link.mobile {
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		display: block;
	}

	.nav-link.mobile:last-child {
		border-bottom: none;
	}

	/* CTA Button Styling */
	.nav-link.cta-header {
		padding: 12px 24px;
		border-radius: 999px;
		background: linear-gradient(135deg, #F11759, #8333C5);
		color: #ffffff;
		font-weight: 600;
		border: none;
		box-shadow: 0 2px 8px rgba(131, 51, 197, 0.2);
	}

	.nav-link.cta-header:hover {
		transform: translateY(-2px) scale(1.05);
		box-shadow: 0 8px 24px rgba(131, 51, 197, 0.35);
		color: #ffffff;
	}

	.nav-link.cta-header.mobile {
		margin-top: 1rem;
		text-align: center;
		border-bottom: none;
		padding: 14px 24px;
	}
</style>