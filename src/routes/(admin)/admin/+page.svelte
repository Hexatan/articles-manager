<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="admin-dashboard">
	<header class="page-header">
		<h1>Dashboard</h1>
		<div class="header-actions">
			<Button variant="primary">New Article</Button>
		</div>
	</header>

	<div class="dashboard-grid">
		<Card title="Articles" subtitle="Manage your content">
			<div class="stat-card">
				<div class="stat">
					<span class="stat-value">24</span>
					<span class="stat-label">Total Articles</span>
				</div>
				<div class="stat">
					<span class="stat-value">5</span>
					<span class="stat-label">Published Today</span>
				</div>
				<div class="stat">
					<span class="stat-value">3</span>
					<span class="stat-label">Drafts</span>
				</div>
			</div>
		</Card>
	</div>
</div>

<style>
	.admin-dashboard {
		width: 100%;
	}

	.page-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-4);
		margin-bottom: var(--spacing-6);

		@media (min-width: 769px) {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 0;
		}
	}

	.page-header h1 {
		font-size: var(--font-size-2xl);
		font-weight: 700;
		color: var(--color-text);
		margin: 0;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-6);

		@media (min-width: 769px) {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		}
	}

	.stat-card {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-4);
	}

	.stat {
		display: flex;
		flex-direction: column;
		min-width: 100px;
	}

	.stat-value {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--color-text);
	}

	.stat-label {
		font-size: var(--font-size-sm);
		color: var(--color-text-light);
	}
</style>
