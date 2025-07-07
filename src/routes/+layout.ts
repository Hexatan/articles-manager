import { browser } from '$app/environment';
import { makeServer } from '../mirage/server';
import { initAuth } from '$lib/auth/auth.svelte';

// Initialize MirageJS only in development mode and in the browser
if (browser && import.meta.env.DEV) {
	// Check if we're running in Cypress test environment
	const isCypressTest = window.Cypress !== undefined;

	// Pass the appropriate environment to makeServer
	makeServer({
		environment: isCypressTest ? 'test' : 'development'
	});

	initAuth();
}

export const prerender = true;
export const ssr = false;
