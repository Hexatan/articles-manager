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
