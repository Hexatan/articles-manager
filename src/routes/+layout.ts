import { browser } from '$app/environment';
import { makeServer } from '../mirage/server';
import { initAuth } from '$lib/auth/auth.svelte';

// Initialize MirageJS only in development mode and in the browser
if (browser && import.meta.env.DEV) {
	makeServer();
	initAuth();
}

export const prerender = true;
export const ssr = false;
