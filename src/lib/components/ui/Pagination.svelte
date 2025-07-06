<script lang="ts">
	import Button from './Button.svelte';
	import Select from './Select.svelte';
	import Input from './Input.svelte';
	import { onMount } from 'svelte';

	interface PaginationMeta {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	}

	interface Props {
		meta: PaginationMeta;
		onPageChange: (page: number) => void;
		onLimitChange?: (limit: number) => void;
	}

	const { meta, onPageChange, onLimitChange = undefined }: Props = $props();

	let startItem = $derived((meta.page - 1) * meta.limit + 1);
	let endItem = $derived(Math.min(meta.page * meta.limit, meta.total));

	let jumpToPage = $state('');
	let jumpToPageError = $state('');

	let pageSizeOptions = $derived.by(() => {
		const baseOptions = [
			{ value: '10', label: '10' },
			{ value: '25', label: '25' },
			{ value: '50', label: '50' },
			{ value: '100', label: '100' }
		];

		const filteredOptions = baseOptions.filter(option => parseInt(option.value) <= meta.total);

		if (meta.total > 0) {
			filteredOptions.push({ value: meta.total.toString(), label: 'All' });
		}

		return filteredOptions;
	});

	// For responsive design
	let isMobile = $state(false);

	function getPageRange(currentPage: number, totalPages: number, maxVisible = 5) {
		// Calculate the range of pages to show
		let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let endPage = Math.min(totalPages, startPage + maxVisible - 1);

		// Adjust if we're near the end
		if (endPage - startPage + 1 < maxVisible && startPage > 1) {
			startPage = Math.max(1, endPage - maxVisible + 1);
		}

		// Generate the array of page numbers
		const pages = [];
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Don't interfere with input fields
		if (
			event.target instanceof HTMLInputElement ||
			event.target instanceof HTMLTextAreaElement ||
			event.target instanceof HTMLSelectElement
		) {
			return;
		}

		if (event.key === 'ArrowLeft' && meta.page > 1) {
			onPageChange(meta.page - 1);
		} else if (event.key === 'ArrowRight' && meta.page < meta.totalPages) {
			onPageChange(meta.page + 1);
		} else if (event.key === 'Home') {
			onPageChange(1);
		} else if (event.key === 'End') {
			onPageChange(meta.totalPages);
		}
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(max-width: 640px)');
		isMobile = mediaQuery.matches;

		const handler = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	});
</script>

<svelte:window onkeydown={handleKeyDown} />

<nav aria-label="Pagination" class="pagination">
	<div class="pagination-info" aria-live="polite">
		Showing {startItem} to {endItem} of {meta.total} items
	</div>

	{#if isMobile}
		<!-- Simplified mobile view -->
		<div class="pagination-controls-mobile">
			<div class="pagination-buttons">
				<!-- Previous page button -->
				<Button
					variant="outline"
					size="sm"
					onclick={() => onPageChange(meta.page - 1)}
					disabled={meta.page === 1}
					aria-label="Previous page"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
							 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</Button>

				<span class="pagination-page">Page {meta.page} of {meta.totalPages}</span>

				<!-- Next page button -->
				<Button
					variant="outline"
					size="sm"
					onclick={() => onPageChange(meta.page + 1)}
					disabled={meta.page === meta.totalPages}
					aria-label="Next page"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
							 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</Button>
			</div>

			{#if onLimitChange}
				<div class="pagination-options">
					<Select
						label="Items per page"
						options={pageSizeOptions}
						value={meta.limit.toString()}
						onchange={(e) => onLimitChange(parseInt(e.currentTarget.value))}
					/>
				</div>
			{/if}
		</div>
	{:else}
		<!-- Full desktop view -->
		<div class="pagination-controls-wrapper" aria-label="Pagination buttons" role="group" aria-live="polite">
			<div class="pagination-options">
				{#if onLimitChange}
					<div class="items-per-page">
						<Select
							label="Items per page"
							options={pageSizeOptions}
							value={meta.limit.toString()}
							onchange={(e) => onLimitChange(parseInt(e.currentTarget.value))}
						/>
					</div>
				{/if}
			</div>

			<div class="pagination-controls">
				<!-- Previous page button -->
				<Button
					variant="outline"
					size="sm"
					onclick={() => onPageChange(meta.page - 1)}
					disabled={meta.page === 1}
					aria-label="Previous page"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
							 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</Button>

				<!-- First page -->
				{#if meta.page > 3}
					<Button
						variant="outline"
						size="sm"
						onclick={() => onPageChange(1)}
						aria-label="Go to first page"
						aria-current={meta.page === 1 ? 'page' : undefined}
					>
						1
					</Button>
					{#if meta.page > 4}
						<span class="ellipsis" aria-hidden="true">...</span>
					{/if}
				{/if}

				<!-- Pages around current page -->
				{#each getPageRange(meta.page, meta.totalPages) as pageNum (pageNum)}
					<Button
						variant={pageNum === meta.page ? "primary" : "outline"}
						size="sm"
						onclick={() => onPageChange(pageNum)}
						aria-label={`Go to page ${pageNum}`}
						aria-current={pageNum === meta.page ? 'page' : undefined}
					>
						{pageNum}
					</Button>
				{/each}

				<!-- Last page -->
				{#if meta.page < meta.totalPages - 2}
					{#if meta.page < meta.totalPages - 3}
						<span class="ellipsis" aria-hidden="true">...</span>
					{/if}
					<Button
						variant="outline"
						size="sm"
						onclick={() => onPageChange(meta.totalPages)}
						aria-label="Go to last page"
						aria-current={meta.page === meta.totalPages ? 'page' : undefined}
					>
						{meta.totalPages}
					</Button>
				{/if}

				<!-- Next page button -->
				<Button
					variant="outline"
					size="sm"
					onclick={() => onPageChange(meta.page + 1)}
					disabled={meta.page === meta.totalPages}
					aria-label="Next page"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
							 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</Button>
			</div>
		</div>
	{/if}
</nav>

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

            @media (min-width: 769px) {
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
            }
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

        .pagination-controls-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-4);
            width: 100%;
        }

        .pagination-controls-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-grow: 1;
        }

        .pagination-buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-2);
            width: 100%;
        }

        .pagination-page {
            margin: 0 var(--spacing-2);
            font-size: var(--font-size-sm);
        }

        .pagination-options {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-4);
            width: 100%;
            margin-top: var(--spacing-2);

            @media (min-width: 769px) {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                gap: var(--spacing-4);
                margin-top: 0;
                width: auto;
            }
        }

        .items-per-page {
            min-width: 120px;
        }

        .ellipsis {
            margin: 0 var(--spacing-1);
            color: var(--color-text-light);
        }
    }
</style>
