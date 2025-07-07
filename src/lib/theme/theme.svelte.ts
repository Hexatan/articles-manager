/**
 * Theme Management Module
 *
 * This module provides theme management functionality for the application,
 * supporting light, dark, and system-based themes.
 *
 * Key features:
 * - Theme state management using Svelte's $state
 * - System theme detection
 * - Local storage persistence
 * - SSR-safe implementation
 *
 * Usage:
 * ```typescript
 * import { getTheme, setTheme, getActualTheme } from '$lib/theme/theme.svelte';
 *
 * // Get current theme setting (light/dark/system)
 * const currentTheme = getTheme();
 *
 * // Get actual applied theme (light/dark only)
 * const appliedTheme = getActualTheme();
 *
 * // Change theme
 * setTheme('dark');
 * ```
 *
 * Note: The module handles SSR by defaulting to 'light' theme when
 * running on the server and 'system' when no preference is stored.
 */

import { browser } from '$app/environment';

export type ThemeMode = 'light' | 'dark' | 'system';

function getSystemTheme(): 'light' | 'dark' {
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(): ThemeMode {
	if (!browser) return 'system';
	return (localStorage.getItem('theme') as ThemeMode) || 'system';
}

let theme = $state<ThemeMode>(getStoredTheme());

// Keep the derived state as a non-exported variable
const actualTheme = $derived<'light' | 'dark'>(theme === 'system' ? getSystemTheme() : theme);

// Export a function to get the actual theme value
export function getActualTheme(): 'light' | 'dark' {
	return actualTheme;
}

export function getTheme(): ThemeMode {
	return theme;
}

export function setTheme(newTheme: ThemeMode) {
	theme = newTheme;
	if (browser) {
		localStorage.setItem('theme', newTheme);
	}
}
