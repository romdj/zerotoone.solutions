<script lang="ts">
	import '$lib/styles/navigation.css';
	import { page } from '$app/stores';

	export let label: string;
	export let href: string;
	export let dropdown: Array<{ label: string; href: string }> = [];
	export let isMobile: boolean = false;
	export let closeMenu: () => void;

	let isOpen = false;

	function toggleDropdown() {
		if (isMobile) {
			isOpen = !isOpen;
		}
	}

	function handleMouseEnter() {
		if (!isMobile) {
			isOpen = true;
		}
	}

	function handleMouseLeave() {
		if (!isMobile) {
			isOpen = false;
		}
	}

	$: currentPath = $page.url.pathname;
	$: isActive = currentPath.startsWith(href);
</script>

{#if isMobile}
	<!-- Mobile: Collapsible dropdown -->
	<div class="mobile-dropdown">
		<button
			class="nav-link mobile dropdown-trigger"
			class:active={isActive}
			on:click={toggleDropdown}
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
{:else}
	<!-- Desktop: Hover dropdown -->
	<div
		class="dropdown-container"
		role="navigation"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
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
{/if}
