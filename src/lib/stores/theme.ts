import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	const updateTheme = (theme: Theme) => {
		set(theme);
		if (browser) {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
		}
	};

	if (browser) {
		// Initialize theme from localStorage or system preference
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

		set(initialTheme);
		document.documentElement.setAttribute('data-theme', initialTheme);

		// Listen for system theme changes (only if no saved preference)
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', (e) => {
			if (!localStorage.getItem('theme')) {
				const newTheme = e.matches ? 'dark' : 'light';
				set(newTheme);
				document.documentElement.setAttribute('data-theme', newTheme);
			}
		});
	}

	return {
		subscribe,
		toggle: () => {
			update(current => {
				const newTheme: Theme = current === 'dark' ? 'light' : 'dark';
				if (browser) {
					document.documentElement.setAttribute('data-theme', newTheme);
					localStorage.setItem('theme', newTheme);
				}
				return newTheme;
			});
		}
	};
}

export const theme = createThemeStore();
