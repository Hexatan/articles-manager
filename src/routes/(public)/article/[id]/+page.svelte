<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import type { Article } from '$lib/types/article';
	import { page } from '$app/state';
	import { formatDate } from '$lib/utils/date';

	const articleId = page.params.id;

	let article = $state<Article | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	async function fetchArticle() {
		isLoading = true;
		error = null;

		try {
			const response = await fetch(`/api/articles/${articleId}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch article: ${response.statusText}`);
			}

			const data = await response.json();
			article = data.article;
		} catch (err) {
			console.error('Error fetching article:', err);
			error = err instanceof Error ? err.message : 'An unknown error occurred';
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		fetchArticle();
	});
</script>

<div class="article-page">
	{#if isLoading}
		<div class="loading">Loading article...</div>
	{:else if error}
		<div class="error">
			<p>{error}</p>
			<a href="/" class="back-link">Back to articles</a>
		</div>
	{:else if article}
		<div class="article-container">
			<a href="/" class="back-link">← Back to articles</a>

			<Card variant="elevated" padding="lg">
				<div class="article-header">
					<h1 class="article-title">{article.title}</h1>
					<div class="article-meta">
						<span class="article-author">By {article.author}</span>
						<span class="article-date">Published on {formatDate(article.createdAt)}</span>
					</div>
				</div>

				<div class="article-content">
					<p class="placeholder-content">
						This is a placeholder for the full article content. In a real application, this would
						display the complete text of "{article.title}" by {article.author}.
					</p>
				</div>
			</Card>
		</div>
	{:else}
		<div class="error">
			<p>Article not found</p>
			<a href="/" class="back-link">Back to articles</a>
		</div>
	{/if}
</div>

<style>
	.article-page {
		padding: var(--spacing-6) 0;
	}

	.article-container {
		max-width: 800px;
		margin: 0 auto;
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--spacing-4);
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 500;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.article-header {
		margin-bottom: var(--spacing-6);
	}

	.article-title {
		font-size: var(--font-size-3xl);
		font-weight: 700;
		margin-bottom: var(--spacing-2);
		line-height: 1.2;
	}

	.article-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-3);
		color: var(--color-text-light);
		font-size: var(--font-size-sm);
	}

	.article-content {
		font-size: var(--font-size-base);
		line-height: 1.6;
	}

	.placeholder-content {
		padding: var(--spacing-4);
		background-color: var(--color-background-alt);
		border-radius: var(--border-radius-md);
		font-style: italic;
	}

	.loading,
	.error {
		text-align: center;
		padding: var(--spacing-8);
	}

	.error {
		color: var(--color-danger);
	}
</style>
