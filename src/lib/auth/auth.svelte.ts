/**
 * Authentication Module
 *
 * This module provides a simple authentication and authorization system for the application.
 * It includes user role management, mock users for development/testing, and basic auth state management.
 *
 * Key features:
 * - User role definition and checking
 * - Mock user data for different role types
 * - Authentication state management using Svelte's $state
 * - Persistent authentication via localStorage
 *
 * Note: This is a simplified authentication implementation suitable for prototypes
 * and development. For production, implement proper backend authentication.
 */

export type UserRole = 'admin' | 'editor' | 'viewer' | 'guest';

export interface User {
	id: string;
	name: string;
	email: string;
	roles: UserRole[];
}

/**
 * Mock user data for development and testing
 * Each user represents a different role combination:
 * - Admin: Has all permissions
 * - Editor: Can edit and view content
 * - Viewer: Can only view content
 */
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

/**
 * Application authentication state
 * Managed using Svelte's reactive $state system
 * Tracks the currently logged-in user
 */
export const currentUser = $state<{ user: User | null }>({ user: null });

export function hasRole(role: UserRole): boolean {
	return !!currentUser.user?.roles.includes(role);
}

export function login(userType: keyof typeof MOCK_USERS) {
	currentUser.user = MOCK_USERS[userType];
	// In a real app, you would store authentication token in localStorage/sessionStorage
	localStorage.setItem('userRole', userType);
}

export function logout() {
	currentUser.user = null;
	localStorage.removeItem('userRole');
}

export function initAuth() {
	const savedRole = localStorage.getItem('userRole') as keyof typeof MOCK_USERS | null;
	if (savedRole && MOCK_USERS[savedRole]) {
		currentUser.user = MOCK_USERS[savedRole];
	}
}
