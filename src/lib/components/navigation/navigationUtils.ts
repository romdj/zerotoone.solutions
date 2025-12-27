export interface NavItem {
	href: string;
	label: string;
	isCTA?: boolean;
}

export const navItems: NavItem[] = [
	{ href: '/portfolio', label: 'Portfolio' },
	{ href: '/services', label: 'Services' },
	{ href: '/studio', label: 'Studio' },
	{ href: '/insights', label: 'Insights' },
	{ href: '/contact', label: "Let's Build", isCTA: true }
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