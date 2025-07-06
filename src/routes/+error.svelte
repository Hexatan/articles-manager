<script lang="ts">
	import { page } from '$app/state';

	// Get error details from the page store
	const status = $derived(page.status);
	const message = $derived(page.error?.message || 'An error occurred');
	const description = $derived(page.error?.message || 'Please try again later');
</script>

<div class="error-container">
	<div class="error-content">
		<div class="error-status">{status}</div>

		<h1 class="error-title">{message}</h1>

		<p class="error-description">{description}</p>

		<div class="error-actions">
			<a href="/" class="button secondary"> Go to Homepage </a>
		</div>
	</div>
</div>

<style>
	.error-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: var(--spacing-8);
		background-color: var(--color-background);
		color: var(--color-text);
	}

	.error-content {
		max-width: 600px;
		padding: var(--spacing-8);
		border-radius: var(--border-radius-lg);
		background-color: var(--color-surface);
		box-shadow: var(--shadow-lg);
		text-align: center;
	}

	.error-status {
		font-size: 5rem;
		font-weight: 700;
		color: var(--color-primary);
		line-height: 1;
		margin-bottom: var(--spacing-4);
	}

	.error-title {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: var(--spacing-4);
	}

	.error-description {
		font-size: 1.125rem;
		margin-bottom: var(--spacing-8);
		color: var(--color-text-muted);
	}

	.error-actions {
		display: flex;
		gap: var(--spacing-4);
		justify-content: center;
		flex-wrap: wrap;
	}

	.button {
		display: inline-block;
		padding: var(--spacing-2) var(--spacing-6);
		border-radius: var(--border-radius-md);
		font-weight: 500;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color 0.2s,
			transform 0.1s;
	}

	.button:hover {
		transform: translateY(-1px);
	}

	.button:active {
		transform: translateY(0);
	}

	.primary {
		background-color: var(--color-primary);
		color: white;
	}

	.primary:hover {
		background-color: var(--color-primary-dark);
	}

	.secondary {
		background-color: var(--color-surface-variant);
		color: var(--color-text);
	}

	.secondary:hover {
		background-color: var(--color-surface-variant-dark);
	}
</style>
