<script lang="ts">
	import Button from './Button.svelte';

	interface PaginationMeta {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	}

	interface Props {
		meta: PaginationMeta;
		onPageChange: (page: number) => void;
	}

	const { meta, onPageChange }: Props = $props();

	// Calculate the range of items being displayed
	let startItem = $derived((meta.page - 1) * meta.limit + 1);
	let endItem = $derived(Math.min(meta.page * meta.limit, meta.total));
</script>

<div class="pagination">
	<div class="pagination-info">
		Showing {startItem} to {endItem} of {meta.total} items
	</div>
	<div class="pagination-controls">
		{#if meta.totalPages >= 3 && meta.page !== 1}
			<Button variant="outline" size="sm" onclick={() => onPageChange(1)}>1</Button>
		{/if}
		{#if meta.page - 1 > 1}
			<Button
				variant="outline"
				size="sm"
				disabled={meta.page <= 1}
				onclick={() => onPageChange(meta.page - 1)}
			>
				{meta.page - 1}
			</Button>
		{/if}
		<span class="pagination-page">Page {meta.page} of {meta.totalPages}</span>
		{#if meta.page + 1 < meta.totalPages}
			<Button
				variant="outline"
				size="sm"
				disabled={meta.page >= meta.totalPages}
				onclick={() => onPageChange(meta.page + 1)}
			>
				{meta.page + 1}
			</Button>
		{/if}
		{#if meta.totalPages >= 3}
			<Button
				variant="outline"
				size="sm"
				disabled={meta.page === meta.totalPages}
				onclick={() => onPageChange(meta.totalPages)}
			>
				{meta.totalPages}
			</Button>
		{/if}
	</div>
</div>

<style>
	@layer components {
		.pagination {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--spacing-4);
			margin-top: var(--spacing-6);
			padding-top: var(--spacing-4);
			border-top: 1px solid var(--color-border);
		}

		.pagination-info {
			font-size: var(--font-size-sm);
			color: var(--color-text-light);
		}

		.pagination-controls {
			display: flex;
			align-items: center;
			gap: var(--spacing-2);
		}

		.pagination-page {
			margin: 0 var(--spacing-2);
			font-size: var(--font-size-sm);
		}

		@media (min-width: 769px) {
			.pagination {
				flex-direction: row;
				justify-content: space-between;
			}
		}
	}
</style>
