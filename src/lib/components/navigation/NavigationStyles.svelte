<!-- Global Navigation Styles -->
<style>
	:global(.navbar) {
		display: flex; 
		align-items: center; 
		justify-content: space-between;
		padding: 18px var(--padX, clamp(16px, 4vw, 40px)) 6px;
		position: relative;
		z-index: 1000;
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
	
	:global(.desktop-menu a) {
		color: var(--ink-2, #1d1d21);
		text-decoration: none;
		font-weight: 500;
		opacity: 0.9;
		transition: opacity 0.15s ease;
	}
	
	:global(.desktop-menu a:hover) {
		opacity: 1;
	}
	
	:global(.cta-header) {
		padding: 10px 16px;
		border-radius: 999px;
		border: 1.5px solid #e6e7ee;
		transition: transform 0.15s ease, background-color 0.15s ease;
	}
	
	:global(.cta-header:hover) {
		background: #fafbff;
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
			background: var(--card, #ffffff);
			padding: 1rem;
			gap: 1rem;
			border-radius: 0 0 var(--radius, 22px) var(--radius, 22px);
			box-shadow: var(--shadow, 0 10px 30px rgba(16,24,40,.06));
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
	}
</style>