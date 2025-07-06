<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import ArticleListItem from '$lib/components/ArticleListItem.svelte';
	import { onMount } from 'svelte';

	// Define the Article interface
	interface Article {
		id: string;
		title: string;
		author: string;
		status: 'published' | 'draft' | 'in_review';
		createdAt: string;
	}

	// State for articles data
	let articles = $state<Article[]>([]);
	let meta = $state({
		total: 0,
		page: 1,
		limit: 10,
		totalPages: 0
	});
	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let searchInput = $state('');
	let isSearching = $state(false);
	let currentPage = $state(1);
	let statusFilter = $state('');

	// Status options for the filter
	const statusOptions = [
		{ value: '', label: 'All Statuses' },
		{ value: 'published', label: 'Published' },
		{ value: 'draft', label: 'Draft' },
		{ value: 'in_review', label: 'In review' }
	];

	// Function to fetch articles with direct parameters
	async function fetchArticles(
		params: { page?: number; limit?: number; search?: string; status?: string } = {}
	) {
		isLoading = true;
		error = null;

		try {
			// Use provided parameters or defaults
			const page = params.page || currentPage;
			const limit = params.limit || 10;
			const search = params.search !== undefined ? params.search : searchInput;
			const status = params.status !== undefined ? params.status : statusFilter;

			// Update current page, search input, and status filter
			currentPage = page;
			if (search !== searchInput) {
				searchInput = search;
			}
			if (status !== statusFilter) {
				statusFilter = status;
			}

			// Construct the API URL with query parameters
			const apiUrl = `/api/articles?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}`;

			// Fetch articles from the API
			const response = await fetch(apiUrl);

			const data = await response.json();

			// Update state with fetched data
			articles = data.articles;
			meta = data.meta;
		} catch (err) {
			articles = [];
			meta = {
				total: 0,
				page: 1,
				limit: 10,
				totalPages: 0
			};
			error = err instanceof Error ? err.message : 'An unknown error occurred';
		} finally {
			isLoading = false;
			isSearching = false;
		}
	}

	// Fetch articles on mount
	onMount(() => {
		fetchArticles();
	});

	// Handle search form submission
	function handleSearchSubmit() {
		if (isSearching) return false;
		isSearching = true;

		const timeoutId = setTimeout(() => {
			fetchArticles({ page: 1, search: searchInput, status: statusFilter });
		}, 300);

		return () => clearTimeout(timeoutId);
	}

	// Handle status filter change
	function handleStatusChange() {
		fetchArticles({ page: 1, search: searchInput, status: statusFilter });
	}
</script>

<div class="articles-page">
	<header class="page-header">
		<h1>Articles</h1>
		<div class="header-actions">
			<Button variant="primary">New Article</Button>
		</div>
	</header>

	<Card>
		<div class="filters">
			<div class="search-box">
				<Input
					label="Search"
					name="search"
					placeholder="Search articles..."
					bind:value={searchInput}
					oninput={handleSearchSubmit}
				/>
			</div>
			<div class="status-filter">
				<Select
					name="status"
					label="Status"
					options={statusOptions}
					bind:value={statusFilter}
					onchange={handleStatusChange}
				/>
			</div>
			<div class="filter-actions">
				<Button
					btnType="submit"
					variant="outline"
					size="sm"
					disabled={isSearching}
					onclick={handleSearchSubmit}
				>
					{isSearching ? 'Searching...' : 'Search'}
				</Button>
			</div>
		</div>

		{#if isLoading && !isSearching}
			<div class="loading-indicator">
				<p>Loading articles...</p>
			</div>
		{:else if error}
			<Alert variant="error" title="Error loading articles">
				{error}
			</Alert>
		{:else if articles.length === 0}
			<div class="articles-placeholder">
				<div class="placeholder-message">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
						<polyline points="14 2 14 8 20 8"></polyline>
						<line x1="16" y1="13" x2="8" y2="13"></line>
						<line x1="16" y1="17" x2="8" y2="17"></line>
						<polyline points="10 9 9 9 8 9"></polyline>
					</svg>
					<h2>No articles found</h2>
					<p>There are no articles matching your criteria.</p>
					<p>Try adjusting your search or filters, or create a new article.</p>
				</div>
			</div>
		{:else}
			<div class="articles-list" data-testid="article-list">
				{#each articles as article (article.id)}
					<ArticleListItem {article} />
				{/each}
			</div>

			{#if meta.totalPages > 1}
				<Pagination {meta} onPageChange={(page) => fetchArticles({ page })} />
			{/if}
		{/if}
	</Card>
</div>

<style>
	.articles-page {
		width: 100%;
	}

	.page-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-6);
	}

	.loading-indicator {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-8) 0;
		color: var(--color-text-light);
	}

	.page-header h1 {
		font-size: var(--font-size-2xl);
		font-weight: 700;
		color: var(--color-text);
		margin: 0;
	}

	.filters {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		margin-bottom: var(--spacing-4);
		gap: var(--spacing-4);
	}

	.search-box {
		flex: 1;
		min-width: 250px;
	}

	.status-filter {
		min-width: 200px;
	}

	.filter-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-2);
	}

	@media (min-width: 769px) {
		.page-header {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 0;
		}

		.filters {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
		}
	}

	.articles-placeholder {
		padding: var(--spacing-8) 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.placeholder-message {
		text-align: center;
		color: var(--color-text-light);
		max-width: 400px;
	}

	.placeholder-message svg {
		margin-bottom: var(--spacing-4);
		color: var(--color-text-light);
		opacity: 0.5;
	}

	.placeholder-message h2 {
		font-size: var(--font-size-xl);
		margin-bottom: var(--spacing-2);
		color: var(--color-text);
	}

	.placeholder-message p {
		margin-bottom: var(--spacing-2);
	}

	.articles-list {
		margin-top: var(--spacing-4);
	}
</style>
