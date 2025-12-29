<script>
	import '$lib/styles/navigation.css';

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