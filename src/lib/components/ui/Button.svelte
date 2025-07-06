<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		btnType?: 'button' | 'submit' | 'reset';
		variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		loading?: boolean;
		children: Snippet;
	}

	let {
		btnType,
		variant,
		size = 'md',
		disabled = false,
		fullWidth = false,
		loading = false,
		children,
		...props
	}: Props = $props();
</script>

<button
	type={btnType}
	class="button {variant} {size} {fullWidth ? 'full-width' : ''}"
	disabled={disabled || loading}
	{...props}
>
	{#if loading}
		<span class="loading-spinner"></span>
	{/if}
	{@render children?.()}
</button>

<style>
	@layer components {
		.button {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border-radius: var(--border-radius-md);
			font-weight: 500;
			cursor: pointer;
			transition:
				background-color var(--transition-fast),
				border-color var(--transition-fast),
				color var(--transition-fast),
				box-shadow var(--transition-fast);
			border: 1px solid transparent;
		}

		.button:focus {
			outline: 2px solid var(--color-primary);
			outline-offset: 2px;
		}

		.button:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}

		/* Variants */
		.primary {
			background-color: var(--color-primary);
			color: white;
		}

		.primary:hover:not(:disabled) {
			background-color: var(--color-primary-dark);
		}

		.secondary {
			background-color: var(--color-secondary);
			color: white;
		}

		.secondary:hover:not(:disabled) {
			background-color: var(--color-secondary-dark);
		}

		.danger {
			background-color: var(--color-danger);
			color: white;
		}

		.danger:hover:not(:disabled) {
			background-color: var(--color-danger-dark);
		}

		.outline {
			background-color: transparent;
			border-color: var(--color-border);
			color: var(--color-text);
		}

		.outline:hover:not(:disabled) {
			background-color: var(--color-background-alt);
		}

		.ghost {
			background-color: transparent;
			color: var(--color-text);
		}

		.ghost:hover:not(:disabled) {
			background-color: var(--color-background-alt);
		}

		/* Sizes */
		.sm {
			font-size: var(--font-size-sm);
			padding: var(--spacing-1) var(--spacing-2);
			height: 2rem;
		}

		.md {
			font-size: var(--font-size-md);
			padding: var(--spacing-2) var(--spacing-4);
			height: 2.5rem;
		}

		.lg {
			font-size: var(--font-size-lg);
			padding: var(--spacing-3) var(--spacing-6);
			height: 3rem;
		}

		/* Loading spinner */
		.loading-spinner {
			width: 1em;
			height: 1em;
			border: 2px solid currentColor;
			border-bottom-color: transparent;
			border-radius: 50%;
			display: inline-block;
			margin-right: var(--spacing-2);
			animation: spinner 0.75s linear infinite;
		}

		@keyframes spinner {
			to {
				transform: rotate(360deg);
			}
		}
	}
</style>
