<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
		variant?: 'default' | 'outlined' | 'elevated';
		padding?: 'none' | 'sm' | 'md' | 'lg';
	}

	let {
		title = '',
		subtitle = '',
		header,
		footer,
		children,
		variant = 'default',
		padding = 'md'
	}: Props = $props();
</script>

<div class="card {variant} padding-{padding}">
	{#if header}
		<div class="card-header">
			{@render header()}
		</div>
	{:else if title || subtitle}
		<div class="card-header">
			{#if title}
				<h3 class="card-title">{title}</h3>
			{/if}
			{#if subtitle}
				<div class="card-subtitle">{subtitle}</div>
			{/if}
		</div>
	{/if}

	<div class="card-content">
		{@render children()}
	</div>

	{#if footer}
		<div class="card-footer">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	@layer components {
		.card {
			border-radius: var(--border-radius-lg);
			background-color: var(--color-background);
			overflow: hidden;
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		/* Variants */
		.default {
			border: 1px solid var(--color-border);
		}

		.outlined {
			border: 1px solid var(--color-border);
		}

		.elevated {
			border: none;
			box-shadow: var(--shadow-md);
		}

		/* Padding variants */
		.padding-none .card-content {
			padding: 0;
		}

		.padding-sm .card-content {
			padding: var(--spacing-2);
		}

		.padding-md .card-content {
			padding: var(--spacing-4);
		}

		.padding-lg .card-content {
			padding: var(--spacing-6);
		}

		/* Header */
		.card-header {
			padding: var(--spacing-4);
			border-bottom: 1px solid var(--color-border);
		}

		.padding-sm .card-header {
			padding: var(--spacing-2);
		}

		.padding-lg .card-header {
			padding: var(--spacing-6);
		}

		.card-title {
			font-size: var(--font-size-lg);
			font-weight: 600;
			color: var(--color-text);
			margin: 0;
			margin-bottom: var(--spacing-1);
		}

		.card-subtitle {
			font-size: var(--font-size-sm);
			color: var(--color-text-light);
		}

		/* Footer */
		.card-footer {
			padding: var(--spacing-4);
			border-top: 1px solid var(--color-border);
			background-color: var(--color-background-alt);
		}

		.padding-sm .card-footer {
			padding: var(--spacing-2);
		}

		.padding-lg .card-footer {
			padding: var(--spacing-6);
		}
	}
</style>
