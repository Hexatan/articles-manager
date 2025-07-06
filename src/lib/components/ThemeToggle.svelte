<script lang="ts">
	import {
		getActualTheme,
		getStoredTheme,
		getTheme,
		setTheme,
		type ThemeMode
	} from '$lib/theme/theme.svelte';
	import { browser } from '$app/environment';

	// Define the theme options
	const themeOptions: { value: ThemeMode; label: string; icon: string }[] = [
		{
			value: 'light',
			label: 'Light',
			icon: 'sun'
		},
		{
			value: 'dark',
			label: 'Dark',
			icon: 'moon'
		},
		{
			value: 'system',
			label: 'System',
			icon: 'monitor'
		}
	];

	// Get the current theme
	let currentTheme = $derived(getTheme());

	let theme = $state<ThemeMode>(getStoredTheme());

	$effect(() => {
		if (!browser) return;
		document.documentElement.classList.remove('light-theme', 'dark-theme');
		document.documentElement.classList.add(`${getActualTheme()}-theme`);
	});

	$effect(() => {
		if (!browser || theme !== 'system') return;
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleChange = () => {
			// This will trigger a re-computation of actualTheme
			theme = 'system';
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});
</script>

<div class="theme-toggle">
	<div class="theme-toggle-buttons">
		{#each themeOptions as option (option.value)}
			<button
				class="theme-button {currentTheme === option.value ? 'active' : ''}"
				aria-label="Switch to {option.label} theme"
				onclick={() => setTheme(option.value)}
			>
				{#if option.icon === 'sun'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="5"></circle>
						<line x1="12" y1="1" x2="12" y2="3"></line>
						<line x1="12" y1="21" x2="12" y2="23"></line>
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
						<line x1="1" y1="12" x2="3" y2="12"></line>
						<line x1="21" y1="12" x2="23" y2="12"></line>
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
					</svg>
				{:else if option.icon === 'moon'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
					</svg>
				{:else if option.icon === 'monitor'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
						<line x1="8" y1="21" x2="16" y2="21"></line>
						<line x1="12" y1="17" x2="12" y2="21"></line>
					</svg>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
	}

	.theme-toggle-buttons {
		display: flex;
		background-color: var(--color-background-alt);
		border-radius: var(--border-radius-md);
		padding: var(--spacing-1);
		gap: var(--spacing-1);
	}

	.theme-button {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-3);
		border: none;
		background: transparent;
		color: var(--color-text);
		border-radius: var(--border-radius-sm);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.theme-button:hover {
		background-color: var(--color-background-hover);
	}

	.theme-button.active {
		background-color: var(--color-background);
		box-shadow: var(--shadow-sm);
	}

	.theme-label {
		display: none;
	}

	@media (min-width: 640px) {
		.theme-label {
			display: inline;
		}
	}
</style>
