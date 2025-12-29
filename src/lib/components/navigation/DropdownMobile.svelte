<script lang="ts">
	import '$lib/styles/navigation.css';
	import { page } from '$app/stores';

	export let label: string;
	export let href: string;
	export let dropdown: Array<{ label: string; href: string }> = [];
	export let closeMenu: () => void;

	let isOpen = false;

	$: currentPath = $page.url.pathname;
	$: isActive = currentPath.startsWith(href);
</script>

<div class="mobile-dropdown">
	<button
		class="nav-link mobile dropdown-trigger"
		class:active={isActive}
		on:click={() => isOpen = !isOpen}
	>
		{label}
		<span class="chevron" class:open={isOpen}>▾</span>
	</button>
	{#if isOpen}
		<div class="mobile-submenu">
			{#each dropdown as item}
				<a
					href={item.href}
					class="submenu-link"
					class:active={currentPath === item.href}
					on:click={closeMenu}
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
</div>
