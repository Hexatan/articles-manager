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
