<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import ArticleForm from '$lib/components/ArticleForm.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { articleSchema } from '$lib/schemas/schemas';
	import { goto } from '$app/navigation';
	import { z } from 'zod/v4';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let title = $state('');
	let author = $state('');
	let status = $state('');
	let errors = $state<Record<string, string[]>>({});
	let formError = $state<string | null>(null);
	let isSubmitting = $state(false);
	let isLoading = $state(true);
	let loadError = $state<string | null>(null);

	onMount(async () => {
		await fetchArticle();
	});

	async function fetchArticle() {
		isLoading = true;
		loadError = null;

		try {
			const articleId = page.params.id;
			const response = await fetch(`/api/articles/${articleId}`);

			if (!response.ok) {
				throw new Error('Failed to fetch article');
			}

			const data = await response.json();

			title = data.article.title;
			author = data.article.author;
			status = data.article.status;
		} catch (err) {
			loadError = err instanceof Error ? err.message : 'An unknown error occurred';
		} finally {
			isLoading = false;
		}
	}

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

			const articleId = page.params.id;
			const response = await fetch(`/api/articles/${articleId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(result.data)
			});

			if (!response.ok) {
				const errorData = await response.json();
				formError = errorData.message || 'Failed to update article';
				isSubmitting = false;
				return;
			}

			await goto(`/admin/articles/`);
		} catch (error) {
			formError = error instanceof Error ? error.message : 'An unexpected error occurred';
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>{title ? `Edit ${title} | Article Manager` : 'Edit Article | Article Manager'}</title>
</svelte:head>

<div class="edit-article-page">
	<header class="page-header">
		<h1>Edit Article</h1>
	</header>

	{#if isLoading}
		<div class="loading-indicator">
			<p>Loading article...</p>
		</div>
	{:else if loadError}
		<Alert variant="error" title="Error loading article">
			{loadError}
		</Alert>
	{:else}
		<Card>
			<ArticleForm
				bind:title
				bind:author
				bind:status
				{errors}
				{formError}
				{isSubmitting}
				submitLabel="Update Article"
				onsubmit={handleSubmit}
			/>
		</Card>
	{/if}
</div>

<style>
	.edit-article-page {
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

	.loading-indicator {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-8) 0;
		color: var(--color-text-light);
	}
</style>
