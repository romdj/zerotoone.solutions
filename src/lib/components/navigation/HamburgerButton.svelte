<script>
	export let isOpen = false;
	export let toggle;
</script>

<button class="hamburger" on:click={toggle} aria-label="Toggle menu">
	<span class="hamburger-line" class:open={isOpen}></span>
	<span class="hamburger-line" class:open={isOpen}></span>
	<span class="hamburger-line" class:open={isOpen}></span>
</button>

<style>
	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 4px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
	}
	
	.hamburger-line {
		width: 24px;
		height: 3px;
		background: #4a5568;
		border-radius: 2px;
		transition: all 0.3s ease;
		transform-origin: center;
	}
	
	.hamburger-line.open:nth-child(1) {
		transform: rotate(45deg) translate(7px, 7px);
	}
	
	.hamburger-line.open:nth-child(2) {
		opacity: 0;
	}
	
	.hamburger-line.open:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -7px);
	}
	
	@media (min-width: 769px) {
		.hamburger {
			display: none;
		}
	}
</style>