<!-- Global Navigation Styles -->
<style>
	:global(.navbar) {
		display: flex; 
		align-items: center; 
		justify-content: space-between;
		padding: 18px var(--padX, clamp(16px, 4vw, 40px)) 6px;
		position: relative;
		z-index: 1000;
		background: var(--bg-overlay);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border-light);
	}
	
	:global(.nav-container) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	
	:global(.desktop-menu) {
		display: flex;
		gap: 28px;
		align-items: center;
	}
	
	:global(.nav-actions) {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	
	:global(.desktop-menu a) {
		color: var(--text-primary);
		text-decoration: none;
		font-weight: 500;
		opacity: 0.9;
		transition: opacity 0.15s ease, color 0.3s ease;
	}
	
	:global(.desktop-menu a:hover) {
		opacity: 1;
	}
	
	:global(.cta-header) {
		padding: 10px 16px;
		border-radius: 999px;
		border: 1.5px solid var(--border-medium);
		transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.3s ease;
	}
	
	:global(.cta-header:hover) {
		background: var(--hover-bg);
		transform: translateY(-1px);
	}
	
	:global(.mobile-menu) {
		display: none;
	}
	
	/* Mobile Styles */
	@media (max-width: 768px) {
		:global(.desktop-menu) {
			display: none;
		}
		
		:global(.mobile-menu) {
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: var(--card-bg);
			padding: 1rem;
			gap: 1rem;
			border-radius: 0 0 var(--radius, 22px) var(--radius, 22px);
			box-shadow: var(--card-shadow);
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
		
		:global(.mobile-theme-toggle) {
			display: flex;
			justify-content: center;
			padding-top: 1rem;
			border-top: 1px solid var(--border-light);
			margin-top: 0.5rem;
		}
		
		:global(.nav-actions) {
			gap: 8px;
		}
	}
</style>