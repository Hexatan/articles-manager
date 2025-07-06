<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import ArticleForm from '$lib/components/ArticleForm.svelte';
	import { articleSchema } from '$lib/schemas/schemas';
	import { goto } from '$app/navigation';
	import { z } from 'zod/v4';

	// State for form data
	let title = $state('');
	let author = $state('');
	let status = $state('');
	let errors = $state<Record<string, string[]>>({});
	let formError = $state<string | null>(null);
	let isSubmitting = $state(false);

	// Handle form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Reset errors
		errors = {};
		formError = null;
		isSubmitting = true;

		try {
			// Validate form data using Zod schema
			const result = articleSchema.safeParse({ title, author, status });

			if (result.error) {
				const flattened = z.flattenError(result.error);

				errors = flattened.fieldErrors;

				isSubmitting = false;
				return;
			}

			// Make API call to create the article
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

			// Redirect to the articles list on success
			await goto('/admin/articles');
		} catch (error) {
			// Handle unexpected errors
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
			errors={errors}
			formError={formError}
			isSubmitting={isSubmitting}
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
