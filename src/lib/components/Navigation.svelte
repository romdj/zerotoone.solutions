<script>
	import { page } from '$app/stores';
	
	let isMenuOpen = false;
	
	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};
	
	const closeMenu = () => {
		isMenuOpen = false;
	};
	
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/solutions', label: 'Solutions' },
		{ href: '/portfolio', label: 'Portfolio' },
		{ href: '/incubator', label: 'Incubator' },
		{ href: '/resources', label: 'Resources' }
	];
</script>

<nav class="navbar">
	<div class="nav-container">
		<!-- Logo/Brand -->
		<a href="/" class="nav-brand" on:click={closeMenu}>
			<span class="brand-text">Zero to One</span>
		</a>
		
		<!-- Desktop Navigation -->
		<div class="nav-menu desktop-menu">
			{#each navItems as item}
				<a 
					href={item.href} 
					class="nav-link" 
					class:active={$page.url.pathname === item.href}
					on:click={closeMenu}
				>
					{item.label}
				</a>
			{/each}
		</div>
		
		<!-- Mobile Hamburger -->
		<button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
			<span class="hamburger-line" class:open={isMenuOpen}></span>
			<span class="hamburger-line" class:open={isMenuOpen}></span>
			<span class="hamburger-line" class:open={isMenuOpen}></span>
		</button>
	</div>
	
	<!-- Mobile Menu -->
	<div class="mobile-menu" class:open={isMenuOpen}>
		{#each navItems as item}
			<a 
				href={item.href} 
				class="mobile-nav-link" 
				class:active={$page.url.pathname === item.href}
				on:click={closeMenu}
			>
				{item.label}
			</a>
		{/each}
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		z-index: 1000;
		transition: all 0.3s ease;
	}
	
	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px;
	}
	
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
	
	.desktop-menu {
		display: flex;
		gap: 2rem;
		align-items: center;
	}
	
	.nav-link {
		text-decoration: none;
		color: #4a5568;
		font-weight: 500;
		transition: color 0.3s ease;
		position: relative;
	}
	
	.nav-link:hover {
		color: #F11759;
	}
	
	.nav-link.active {
		color: #F11759;
	}
	
	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(135deg, #F11759, #8333C5);
		border-radius: 1px;
	}
	
	.hamburger {
		display: none;
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
	
	.mobile-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		padding: 1rem 2rem 2rem;
		gap: 1rem;
		transform: translateY(-100%);
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
	}
	
	.mobile-menu.open {
		transform: translateY(0);
		opacity: 1;
		visibility: visible;
	}
	
	.mobile-nav-link {
		text-decoration: none;
		color: #4a5568;
		font-weight: 500;
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		transition: color 0.3s ease;
	}
	
	.mobile-nav-link:hover,
	.mobile-nav-link.active {
		color: #F11759;
	}
	
	.mobile-nav-link:last-child {
		border-bottom: none;
	}
	
	/* Mobile Styles */
	@media (max-width: 768px) {
		.nav-container {
			padding: 0 1rem;
			height: 60px;
		}
		
		.nav-brand {
			font-size: 1.1rem;
		}
		
		.desktop-menu {
			display: none;
		}
		
		.hamburger {
			display: flex;
		}
		
		.mobile-menu {
			display: flex;
		}
	}
	
	/* Desktop Styles */
	@media (min-width: 769px) {
		.mobile-menu {
			display: none !important;
		}
	}
	
	/* Add top padding to body to account for fixed navbar */
	:global(body) {
		padding-top: 70px;
	}
	
	@media (max-width: 768px) {
		:global(body) {
			padding-top: 60px;
		}
	}
</style>