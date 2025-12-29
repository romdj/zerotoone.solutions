export interface NavItem {
	href: string;
	label: string;
	isCTA?: boolean;
	dropdown?: {
		label: string;
		href: string;
	}[];
}

export const navItems: NavItem[] = [
	{ href: '/work', label: 'WORK' },
	{
		href: '/in-house',
		label: 'IN-HOUSE',
		dropdown: [
			{ label: 'Products', href: '/in-house/products' },
			{ label: 'Companies', href: '/in-house/companies' }
		]
	},
	{ href: '/about', label: 'ABOUT' },
	{ href: '/contact', label: 'CONTACT' }
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