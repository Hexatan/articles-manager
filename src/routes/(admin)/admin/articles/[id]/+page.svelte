<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import DeleteArticleModal from '$lib/components/DeleteArticleModal.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { Article } from '$lib/types/article';

	let article = $state<Article | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	let isDeleteModalOpen = $state(false);

	let articleDate = $derived(
		article
			? new Date(article.createdAt).toLocaleDateString('en-NZ', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				})
			: ''
	);

	onMount(async () => {
		await fetchArticle();
	});

	async function fetchArticle() {
		isLoading = true;
		error = null;

		try {
			const articleId = page.params.id;
			const response = await fetch(`/api/articles/${articleId}`);

			if (!response.ok) {
				throw new Error('Failed to fetch article');
			}

			const data = await response.json();
			article = data.article;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
		} finally {
			isLoading = false;
		}
	}

	function handleDeleteClick(event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();
		isDeleteModalOpen = true;
	}

	async function confirmDeleteArticle() {
		if (!article) return;

		try {
			const response = await fetch(`/api/articles/${article.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Failed to delete article');
			}

			goto('/admin/articles');
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			isDeleteModalOpen = false;
		}
	}

	function cancelDeleteArticle() {
		isDeleteModalOpen = false;
	}
</script>

<svelte:head>
	<title
		>{article ? `${article.title} | Article Manager` : 'Article Details | Article Manager'}</title
	>
</svelte:head>

<!-- Delete Confirmation Modal -->
<DeleteArticleModal
	{article}
	isOpen={isDeleteModalOpen}
	onConfirm={confirmDeleteArticle}
	onCancel={cancelDeleteArticle}
/>

<div class="article-detail-page">
	<header class="page-header">
		<div class="header-content">
			<h1>Article Details</h1>
		</div>
		<div class="header-actions">
			<Button variant="outline" onclick={() => history.back()}>Back</Button>
			{#if article}
				<a href="/admin/articles/{article.id}/edit">
					<Button variant="primary">Edit Article</Button>
				</a>
				<Button variant="danger" onclick={handleDeleteClick}>Delete Article</Button>
			{/if}
		</div>
	</header>

	{#if isLoading}
		<div class="loading-indicator">
			<p>Loading article...</p>
		</div>
	{:else if error}
		<Alert variant="error" title="Error loading article">
			{error}
		</Alert>
	{:else if article}
		<Card>
			<div class="article-detail">
				<div class="article-header">
					<h2 class="article-title">{article.title}</h2>
					<div class="article-status">
						<span class="status-badge {article.status.toLowerCase().replace(' ', '-')}"
							>{article.status}</span
						>
					</div>
				</div>
				<div class="article-meta">
					<div class="meta-item">
						<span class="meta-label">Author:</span>
						<span class="meta-value">{article.author}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Created:</span>
						<span class="meta-value">{articleDate}</span>
					</div>
				</div>
			</div>
		</Card>
	{:else}
		<Alert variant="error" title="Article not found">
			The requested article could not be found.
		</Alert>
	{/if}
</div>

<style>
	.article-detail-page {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-6);
	}

	.header-actions {
		display: flex;
		gap: var(--spacing-2);
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

	.article-detail {
		padding: var(--spacing-4);
	}

	.article-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-4);
	}

	.article-title {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--color-text);
		margin: 0;
	}

	.article-meta {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		margin-top: var(--spacing-4);
	}

	.meta-item {
		display: flex;
		gap: var(--spacing-2);
	}

	.meta-label {
		font-weight: 600;
		color: var(--color-text);
	}

	.meta-value {
		color: var(--color-text-light);
	}

	.status-badge {
		display: inline-block;
		padding: var(--spacing-1) var(--spacing-2);
		border-radius: var(--border-radius-sm);
		font-size: var(--font-size-xs);
		font-weight: 500;
		text-transform: uppercase;
	}

	.status-badge.published {
		background-color: var(--color-success-light);
		color: var(--color-success);
	}

	.status-badge.draft {
		background-color: var(--color-warning-light);
		color: var(--color-warning);
	}

	.status-badge.in-review {
		background-color: var(--color-info-light);
		color: var(--color-info);
	}

	@media (max-width: 640px) {
		.article-header {
			flex-direction: column;
			gap: var(--spacing-2);
		}
	}
</style>
