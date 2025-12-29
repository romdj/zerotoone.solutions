<script>
	export let closeMenu;
</script>

<a href="/" class="brand" on:click={closeMenu}>
	<img src="/logos/zero-to-one/logo 3.jpg" alt="Zero to One Solutions" class="logo" />
</a>

<style>
	.brand {
		display: flex;
		align-items: center;
		text-decoration: none;
		transition: transform 0.2s ease;
	}

	.brand:hover {
		transform: scale(1.05);
	}

	.logo {
		height: 48px;
		width: auto;
		display: block;
		border-radius: 8px;
	}

	@media (max-width: 768px) {
		.logo {
			height: 40px;
		}
	}
</style>