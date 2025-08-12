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
		transition: color 0.3s ease;
		position: relative;
	}
	
	.nav-link:hover {
		color: #F11759;
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
	}
	
	.nav-link.mobile {
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		display: block;
	}
	
	.nav-link.mobile:last-child {
		border-bottom: none;
	}
</style>