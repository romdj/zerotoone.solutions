import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function createBreakpointStore() {
	const { subscribe, set } = writable<Breakpoint>('desktop');

	if (browser) {
		const updateBreakpoint = () => {
			const width = window.innerWidth;
			if (width < 768) {
				set('mobile');
			} else if (width < 1024) {
				set('tablet');
			} else {
				set('desktop');
			}
		};

		// Set initial value
		updateBreakpoint();

		// Update on resize
		window.addEventListener('resize', updateBreakpoint);
	}

	return { subscribe };
}

export const breakpoint = createBreakpointStore();
