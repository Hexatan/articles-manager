<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import ArticleForm from '$lib/components/ArticleForm.svelte';
	import { articleSchema } from '$lib/schemas/schemas';
	import { goto } from '$app/navigation';
	import { z } from 'zod/v4';

	let title = $state('');
	let author = $state('');
	let status = $state('');
	let errors = $state<Record<string, string[]>>({});
	let formError = $state<string | null>(null);
	let isSubmitting = $state(false);

	async function handleSubmit(event: Event) {
		event.preventDefault();

		errors = {};
		formError = null;
		isSubmitting = true;

		try {
			const result = articleSchema.safeParse({ title, author, status });

			if (result.error) {
				const flattened = z.flattenError(result.error);

				errors = flattened.fieldErrors;

				isSubmitting = false;
				return;
			}

			const response = await fetch('/api/articles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(result.data)
			});

			if (!response.ok) {
				const errorData = await response.json();
				formError = errorData.message || 'Failed to create article';
				isSubmitting = false;
				return;
			}

			await goto('/admin/articles');
		} catch (error) {
			formError = error instanceof Error ? error.message : 'An unexpected error occurred';
			isSubmitting = false;
		}
	}
</script>

<div class="new-article-page">
	<header class="page-header">
		<h1>New Article</h1>
	</header>

	<Card>
		<ArticleForm
			bind:title
			bind:author
			bind:status
			{errors}
			{formError}
			{isSubmitting}
			submitLabel="Create Article"
			onsubmit={handleSubmit}
		/>
	</Card>
</div>

<style>
	.new-article-page {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	.page-header {
		margin-bottom: var(--spacing-6);
	}

	.page-header h1 {
		font-size: var(--font-size-2xl);
		font-weight: 700;
		color: var(--color-text);
		margin: 0;
	}
</style>
