<script>
	import { page } from '$app/stores';
	import NavBrand from './navigation/NavBrand.svelte';
	import NavLink from './navigation/NavLink.svelte';
	import HamburgerButton from './navigation/HamburgerButton.svelte';
	import NavigationStyles from './navigation/NavigationStyles.svelte';
	import { navItems, isActiveRoute, createMenuToggler } from './navigation/navigationUtils';
	
	const menuToggler = createMenuToggler();
	
	$: currentPath = $page.url.pathname;
</script>

<NavigationStyles />

<nav class="navbar">
	<div class="nav-container">
		<NavBrand closeMenu={menuToggler.close} />
		
		<!-- Desktop Navigation -->
		<div class="desktop-menu">
			{#each navItems as item}
				<NavLink 
					href={item.href} 
					label={item.label}
					isActive={isActiveRoute(currentPath, item.href)}
					closeMenu={menuToggler.close}
				/>
			{/each}
		</div>
		
		<HamburgerButton 
			isOpen={menuToggler.isOpen} 
			toggle={menuToggler.toggle} 
		/>
	</div>
	
	<!-- Mobile Menu -->
	<div class="mobile-menu" class:open={menuToggler.isOpen}>
		{#each navItems as item}
			<NavLink 
				href={item.href} 
				label={item.label}
				isActive={isActiveRoute(currentPath, item.href)}
				isMobile={true}
				closeMenu={menuToggler.close}
			/>
		{/each}
	</div>
</nav>