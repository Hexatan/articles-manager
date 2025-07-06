import { browser } from '$app/environment';
import { makeServer } from '../mirage/server';

// Initialize MirageJS only in development mode and in the browser
if (browser && import.meta.env.DEV) {
	makeServer();
}

export const prerender = true;
export const ssr = false;
