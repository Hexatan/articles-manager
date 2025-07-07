<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import type { Article } from '$lib/types/article';
	import { formatDate } from '$lib/utils/date';

	// State for articles
	let articles = $state<Article[]>([]);
	let isLoading = $state(false);
	let hasMore = $state(true);
	let currentPage = $state(1);
	let observer: IntersectionObserver | null = null;
	let loadingRef: HTMLDivElement;

	async function fetchArticles(page: number, limit: number = 12) {
		isLoading = true;
		try {
			const response = await fetch(`/api/articles?page=${page}&limit=${limit}&status=published`);
			const data = await response.json();

			// If we're on page 1, replace articles, otherwise append
			if (page === 1) {
				articles = data.articles;
			} else {
				articles = [...articles, ...data.articles];
			}

			// Check if there are more articles to load
			hasMore = page < data.meta.totalPages;
			currentPage = page;
		} catch (error) {
			console.error('Error fetching articles:', error);
		} finally {
			isLoading = false;
		}
	}

	// Initial load
	onMount(() => {
		fetchArticles(1);
	});

	/**
	 * Intersection Observer is used here to implement infinite scrolling functionality.
	 * It observes a target element (loadingRef) at the bottom of the article list.
	 * When this element becomes visible in the viewport, it triggers loading of more articles.
	 *
	 * How it works:
	 * 1. Creates an observer that watches the loading element
	 * 2. When the loading element enters the viewport (isIntersecting is true)
	 * 3. If there are more articles (hasMore) and we're not currently loading (isLoading)
	 * 4. Triggers fetching of the next page of articles
	 */
	$effect(() => {
		// Clean up previous observer if it exists
		if (observer) {
			observer.disconnect();
		}

		// Create new observer
		observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && hasMore && !isLoading) {
					fetchArticles(currentPage + 1);
				}
			},
			{
				root: null // Important: providing settings up as null uses the default viewport f the browser
			}
		);

		// Start observing the loading element if it exists
		if (loadingRef) {
			observer.observe(loadingRef);
		}

		// Clean up on component unmount
		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	});
</script>

<div class="article-feed">
	<h2 class="feed-title">Latest Articles</h2>

	{#if articles.length === 0 && !isLoading}
		<div class="no-articles">
			<p>No articles found.</p>
		</div>
	{:else}
		<div class="article-grid">
			{#each articles as article (article.id)}
				<div class="article-card">
					<Card
						title={article.title}
						subtitle={`By ${article.author}`}
						variant="elevated"
						padding="md"
					>
						<div class="article-content">
							<p class="article-date">Published on {formatDate(article.createdAt)}</p>
							<div class="article-actions">
								<a href={`/article/${article.id}`} class="read-more">Read more</a>
							</div>
						</div>
					</Card>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Loading indicator and intersection observer target -->
	<div class="loading-container" bind:this={loadingRef}>
		{#if isLoading}
			<div class="loading-spinner">Loading...</div>
		{:else if !hasMore && articles.length > 0}
			<div class="end-message">You've reached the end!</div>
		{/if}
	</div>
</div>

<style>
	.article-feed {
		padding: var(--spacing-4) 0;
	}

	.feed-title {
		margin-bottom: var(--spacing-6);
		font-size: var(--font-size-2xl);
		font-weight: 600;
		text-align: center;
	}

	.article-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--spacing-6);
		margin-bottom: var(--spacing-8);
	}

	.article-card {
		height: 100%;
		transition: transform 0.2s ease-in-out;
	}

	.article-card:hover {
		transform: translateY(-4px);
	}

	.article-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.article-date {
		color: var(--color-text-light);
		font-size: var(--font-size-sm);
	}

	.article-actions {
		margin-top: var(--spacing-2);
	}

	.read-more {
		display: inline-block;
		color: var(--color-primary);
		font-weight: 500;
		text-decoration: none;
	}

	.read-more:hover {
		text-decoration: underline;
	}

	.no-articles {
		text-align: center;
		padding: var(--spacing-8);
		color: var(--color-text-light);
	}

	.loading-container {
		text-align: center;
		padding: var(--spacing-6) 0;
	}

	.loading-spinner {
		display: inline-block;
		color: var(--color-text-light);
	}

	.end-message {
		color: var(--color-text-light);
		font-style: italic;
	}

	@media (max-width: 768px) {
		.article-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
