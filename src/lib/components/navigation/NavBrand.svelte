<script>
	export let closeMenu;
</script>

<a href="/" class="brand" on:click={closeMenu}>
	<svg viewBox="0 0 72 72" aria-hidden="true" width="36" height="36">
		<defs>
			<linearGradient id="g-logo" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="#F11759"/>
				<stop offset="55%" stop-color="#8333C5"/>
				<stop offset="100%" stop-color="#D67D21"/>
			</linearGradient>
		</defs>
		<path d="M27.5 54c-11.6 0-21-9.4-21-21s9.4-21 21-21c4.7 0 9 1.5 12.6 4.1" fill="none" stroke="url(#g-logo)" stroke-width="10" stroke-linecap="round"/>
		<path d="M56 12v48" stroke="url(#g-logo)" stroke-width="10" stroke-linecap="round"/>
	</svg>
	<span class="brand-text">01</span>
</a>

<style>
	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		font-weight: 800;
		letter-spacing: 0.2px;
		color: var(--ink-2);
		text-decoration: none;
		transition: transform 0.2s ease;
	}

	.brand:hover {
		transform: scale(1.02);
	}

	.brand svg {
		display: block;
	}

	.brand-text {
		font-size: 24px;
		font-weight: 800;
		background: linear-gradient(135deg, #F11759, #8333C5);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style>