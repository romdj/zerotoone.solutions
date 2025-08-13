<!-- Global Navigation Styles -->
<style>
	:global(.navbar) {
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
	
	:global(.nav-container) {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px;
	}
	
	:global(.desktop-menu) {
		display: flex;
		gap: 2rem;
		align-items: center;
	}
	
	:global(.mobile-menu) {
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
	
	:global(.mobile-menu.open) {
		transform: translateY(0);
		opacity: 1;
		visibility: visible;
	}
	
	/* Add top padding to body to account for fixed navbar */
	:global(body) {
		padding-top: 70px;
	}
	
	/* Mobile Styles */
	@media (max-width: 768px) {
		:global(.nav-container) {
			padding: 0 1rem;
			height: 60px;
		}
		
		:global(.desktop-menu) {
			display: none;
		}
		
		:global(.mobile-menu) {
			display: flex;
		}
		
		:global(body) {
			padding-top: 60px;
		}
	}
	
	/* Desktop Styles */
	@media (min-width: 769px) {
		:global(.mobile-menu) {
			display: none !important;
		}
	}
</style>