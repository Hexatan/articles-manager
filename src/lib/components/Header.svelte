<script lang="ts">
	import type { Snippet } from 'svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import RoleSwitcher from '$lib/components/RoleSwitcher.svelte';

	interface Props {
		title?: string;
		actions?: Snippet;
		variant?: 'public' | 'admin';
		leftAction?: Snippet;
		showRoleSwitcher?: boolean;
	}

	const {
		title = 'Article Manager',
		actions,
		variant = 'public',
		leftAction,
		showRoleSwitcher = false
	}: Props = $props();
</script>

<header class="site-header {variant}-header">
	<div class="container">
		{#if leftAction}
			<div class="left-action">
				{@render leftAction()}
			</div>
		{/if}
		<h1 class="site-title">{title}</h1>
		<div class="header-actions">
			{#if actions}
				{@render actions()}
			{/if}
			{#if showRoleSwitcher}
				<div class="role-switcher-container">
					<RoleSwitcher isInline={true} />
				</div>
			{/if}
			<ThemeToggle />
		</div>
	</div>
</header>

<style>
	.site-header {
		padding: var(--spacing-4) 0;
	}

	/* Public header styling */
	.public-header {
		background-color: var(--color-primary);
		color: var(--color-text-inverse);
	}

	/* Admin header styling */
	.admin-header {
		background-color: var(--color-background);
		color: var(--color-text);
		border-bottom: 1px solid var(--color-border);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-4);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		@media (min-width: 769px) {
			flex-wrap: nowrap;
		}
	}

	/* When leftAction is present, adjust layout */
	.left-action + .site-title {
		margin-left: var(--spacing-4);
	}

	.site-title {
		margin: 0;
		font-size: var(--font-size-lg);
		flex: 1;

		@media (min-width: 769px) {
			font-size: var(--font-size-xl);
		}
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		flex-wrap: wrap;

		@media (min-width: 769px) {
			flex-wrap: nowrap;
		}
	}

	.role-switcher-container {
		order: 3;
		margin-top: var(--spacing-2);
		margin-left: 0;
		width: 100%;

		@media (min-width: 769px) {
			order: initial;
			margin-top: 0;
			margin-left: var(--spacing-4);
			position: absolute;
			top: 70px;
			background: var(--color-primary);
			width: 380px;
		}
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		/* When role switcher is present, add more padding to the header */
		.site-header:has(.role-switcher-container) {
			padding-bottom: var(--spacing-6);
		}
	}
</style>
