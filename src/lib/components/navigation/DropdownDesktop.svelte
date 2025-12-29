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

<div
	class="dropdown-container"
	role="navigation"
	on:mouseenter={() => isOpen = true}
	on:mouseleave={() => isOpen = false}
>
	<a
		{href}
		class="nav-link"
		class:active={isActive}
	>
		{label}
	</a>
	{#if isOpen}
		<div class="dropdown-menu">
			{#each dropdown as item}
				<a
					href={item.href}
					class="dropdown-item"
					on:click={closeMenu}
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
</div>
