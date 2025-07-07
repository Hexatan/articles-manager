/**
 * This layout acts as a gatekeeper for all routes inside the (admin) group.
 * It checks the user's role on every navigation and throws a 403 Forbidden
 * error if the user is not an 'admin', preventing access to admin pages.
 */

import { error } from '@sveltejs/kit';
import { currentUser, hasRole } from '$lib/auth/auth.svelte';

export const prerender = true;
export const ssr = false;

export function load() {
	// Check if user exists and has admin role
	if (!currentUser.user || !hasRole('admin')) {
		throw error(403, {
			message: 'Access Denied'
		});
	}

	return {};
}
