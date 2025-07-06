<script lang="ts">
	interface Props {
		article: {
			id: string;
			title: string;
			author: string;
			status: 'published' | 'draft' | 'in_review';
			createdAt: string;
		};
	}

	const { article }: Props = $props();

	// Format the date to a more readable format
	const formattedDate = new Date(article.createdAt).toLocaleDateString('en-NZ', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
</script>

<div class="article-item" data-testid="article-item">
	<div class="article-info">
		<h3 class="article-title">{article.title}</h3>
		<div class="article-meta">
			<span class="article-author">By {article.author}</span>
			<span class="article-date">Created on {formattedDate}</span>
		</div>
	</div>
	<div class="article-status">
		<span class="status-badge {article.status.toLowerCase().replace(' ', '-')}"
			>{article.status}</span
		>
	</div>
</div>

<style>
	@layer components {
		.article-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: var(--spacing-4);
			border-bottom: 1px solid var(--color-border);
		}

		.article-item:last-child {
			border-bottom: none;
		}

		.article-info {
			flex: 1;
		}

		.article-title {
			font-size: var(--font-size-lg);
			font-weight: 600;
			color: var(--color-text);
			margin: 0 0 var(--spacing-1) 0;
		}

		.article-meta {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing-3);
			font-size: var(--font-size-sm);
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
			.article-item {
				flex-direction: column;
				align-items: flex-start;
				gap: var(--spacing-2);
			}

			.article-meta {
				flex-direction: column;
				gap: var(--spacing-1);
			}
		}
	}
</style>
