<script lang="ts">
	import { breakpoint } from '$lib/stores/breakpoint';
	import DropdownDesktop from './DropdownDesktop.svelte';
	import DropdownMobile from './DropdownMobile.svelte';

	export let label: string;
	export let href: string;
	export let dropdown: Array<{ label: string; href: string }> = [];
	export let closeMenu: () => void;

	$: isMobile = $breakpoint === 'mobile';
</script>

{#if isMobile}
	<DropdownMobile {label} {href} {dropdown} {closeMenu} />
{:else}
	<DropdownDesktop {label} {href} {dropdown} {closeMenu} />
{/if}
