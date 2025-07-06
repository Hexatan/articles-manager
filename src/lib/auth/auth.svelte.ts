// Define user roles
export type UserRole = 'admin' | 'editor' | 'viewer' | 'guest';

// User interface
export interface User {
	id: string;
	name: string;
	email: string;
	roles: UserRole[];
}

// Mock users for demonstration
const MOCK_USERS: Record<string, User> = {
	admin: {
		id: '1',
		name: 'Admin User',
		email: 'admin@example.com',
		roles: ['admin', 'editor', 'viewer'] as UserRole[]
	},
	editor: {
		id: '2',
		name: 'Editor User',
		email: 'editor@example.com',
		roles: ['editor', 'viewer'] as UserRole[]
	},
	viewer: {
		id: '3',
		name: 'Viewer User',
		email: 'viewer@example.com',
		roles: ['viewer'] as UserRole[]
	}
};

// Create reactive state with Runes
export const currentUser = $state<{ user: User | null }>({ user: null });

// Check if user has a specific role
export function hasRole(role: UserRole): boolean {
	return !!currentUser.user?.roles.includes(role);
}

// Login function
export function login(userType: keyof typeof MOCK_USERS) {
	currentUser.user = MOCK_USERS[userType];
	// In a real app, you would store authentication token in localStorage/sessionStorage
	localStorage.setItem('userRole', userType);
}

// Logout function
export function logout() {
	currentUser.user = null;
	localStorage.removeItem('userRole');
}

// Initialize auth state from localStorage (for persistence)
export function initAuth() {
	const savedRole = localStorage.getItem('userRole') as keyof typeof MOCK_USERS | null;
	if (savedRole && MOCK_USERS[savedRole]) {
		currentUser.user = MOCK_USERS[savedRole];
	}
}
