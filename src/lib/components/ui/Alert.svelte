<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant: 'info' | 'success' | 'warning' | 'error';
		title: string;
		dismissible?: boolean;
		children: Snippet;
	}

	let visible = $state(true);

	const { variant, title, dismissible = false, children }: Props = $props();

	const dismiss = () => {
		visible = false;
	};

	const icons = {
		info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
		success: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
		warning: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
		error: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
	};
</script>

{#if visible}
	<div class="alert {variant}" role="alert">
		<div class="alert-icon" aria-hidden="true">
			{@html icons[variant]}
		</div>

		<div class="alert-content">
			{#if title}
				<div class="alert-title">{title}</div>
			{/if}
			<div class="alert-message">
				{@render children()}
			</div>
		</div>

		{#if dismissible}
			<button class="alert-dismiss" aria-label="Dismiss" onclick={dismiss}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		{/if}
	</div>
{/if}

<style>
	@layer components {
		.alert {
			display: flex;
			align-items: flex-start;
			padding: var(--spacing-4);
			border-radius: var(--border-radius-md);
			margin-bottom: var(--spacing-4);
		}

		.info {
			background-color: rgba(59, 130, 246, 0.1);
			border-left: 4px solid var(--color-primary);
			color: var(--color-primary-dark);
		}

		.success {
			background-color: rgba(16, 185, 129, 0.1);
			border-left: 4px solid var(--color-success);
			color: var(--color-success-dark);
		}

		.warning {
			background-color: rgba(245, 158, 11, 0.1);
			border-left: 4px solid var(--color-warning);
			color: var(--color-warning-dark);
		}

		.error {
			background-color: rgba(239, 68, 68, 0.1);
			border-left: 4px solid var(--color-danger);
			color: var(--color-danger-dark);
		}

		.alert-icon {
			flex-shrink: 0;
			margin-right: var(--spacing-3);
			margin-top: 2px;
		}

		.alert-content {
			flex: 1;
		}

		.alert-title {
			font-weight: 600;
			margin-bottom: var(--spacing-1);
		}

		.alert-dismiss {
			background: transparent;
			border: none;
			cursor: pointer;
			padding: var(--spacing-1);
			margin: var(--spacing-1);
			color: currentColor;
			opacity: 0.7;
			transition: opacity var(--transition-fast);
		}

		.alert-dismiss:hover {
			opacity: 1;
		}
	}
</style>
