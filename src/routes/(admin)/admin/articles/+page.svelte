<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
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
				<Input placeholder="Search articles..." />
			</div>
			<div class="filter-actions">
				<Button variant="outline" size="sm">Filter</Button>
				<Button variant="outline" size="sm">Sort</Button>
			</div>
		</div>

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
				<h2>Article List Placeholder</h2>
				<p>The article list functionality will be implemented in a future update.</p>
				<p>This page demonstrates the admin layout and navigation.</p>
			</div>
		</div>
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
</style>
