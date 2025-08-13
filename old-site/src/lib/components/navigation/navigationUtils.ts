export interface NavItem {
	href: string;
	label: string;
}

export const navItems: NavItem[] = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/solutions', label: 'Solutions' },
	{ href: '/portfolio', label: 'Portfolio' },
	{ href: '/incubator', label: 'Incubator' },
	{ href: '/resources', label: 'Resources' }
];

export function isActiveRoute(currentPath: string, itemPath: string): boolean {
	return currentPath === itemPath;
}

export interface MenuToggler {
	readonly isOpen: boolean;
	toggle(): void;
	close(): void;
}

export function createMenuToggler(): MenuToggler {
	let isOpen = false;
	
	return {
		get isOpen() { return isOpen; },
		toggle() { isOpen = !isOpen; },
		close() { isOpen = false; }
	};
}