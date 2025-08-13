<script>
	export let closeMenu;
</script>

<a href="/" class="nav-brand" on:click={closeMenu}>
	<span class="brand-text">Zero to One</span>
</a>

<style>
	.nav-brand {
		text-decoration: none;
		font-size: 1.25rem;
		font-weight: 700;
		background: linear-gradient(135deg, #F11759, #8333C5);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.brand-text {
		display: inline-block;
	}
	
	@media (max-width: 768px) {
		.nav-brand {
			font-size: 1.1rem;
		}
	}
</style>