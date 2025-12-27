export interface NavItem {
	href: string;
	label: string;
	isCTA?: boolean;
}

export const navItems: NavItem[] = [
	{ href: '/about', label: 'About' },
	{ href: '/services', label: 'Services' },
	{ href: '/storyline', label: 'Our Story' },
	{ href: '/contact', label: 'See how we work', isCTA: true }
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