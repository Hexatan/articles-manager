<script lang="ts">
	import type { Article } from '$lib/types/article';
	import { formatDate } from '$lib/utils/date.js';

	interface Props {
		article: Article;
		onDelete?: (id: string) => void;
	}

	const { article, onDelete }: Props = $props();

	function handleDeleteClick(event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();
		if (onDelete) {
			onDelete(article.id);
		}
	}
</script>

<div class="article-item-container" data-testid="article-item">
	<a href="/admin/articles/{article.id}" class="article-item">
		<div class="article-info">
			<h3 class="article-title">{article.title}</h3>
			<div class="article-meta">
				<span class="article-author">By {article.author}</span>
				<span class="article-date">Created on {formatDate(article.createdAt)}</span>
				<span class="status-badge {article.status.toLowerCase().replace(' ', '-')}"
					>{article.status}</span
				>
			</div>
		</div>
	</a>
	<div class="article-actions">
		<a href="/admin/articles/{article.id}/edit" class="action-button edit">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
				<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
			</svg>
			<span class="sr-only">Edit</span>
		</a>
		<button class="action-button delete" onclick={handleDeleteClick}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="3 6 5 6 21 6"></polyline>
				<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
				></path>
				<line x1="10" y1="11" x2="10" y2="17"></line>
				<line x1="14" y1="11" x2="14" y2="17"></line>
			</svg>
			<span class="sr-only">Delete</span>
		</button>
	</div>
</div>

<style>
	@layer components {
		.article-item-container {
			position: relative;
			border-bottom: 1px solid var(--color-border);
			display: grid;
			grid-template-columns: 1fr 70px;
		}

		.article-item-container:last-child {
			border-bottom: none;
		}

		.article-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: var(--spacing-4);
			text-decoration: none;
			color: inherit;
			transition: background-color 0.2s ease;

			&:hover {
				background-color: var(--color-background-hover);
			}

			@media (max-width: 640px) {
				flex-direction: column;
				align-items: flex-start;
				gap: var(--spacing-2);
				padding-bottom: var(--spacing-6);
			}

			@media (max-width: 640px) {
				display: grid;
				grid-template-columns: auto auto;
				gap: var(--spacing-2);
				width: 100%;
			}
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
			margin-right: var(--spacing-2);

			@media (max-width: 640px) {
				grid-column: 1;
				grid-row: 1;
				margin-bottom: var(--spacing-1);
			}
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

    .article-actions {
      display: flex;
      position: absolute;
      bottom: var(--spacing-2);
      right: var(--spacing-2);
      top: auto;
      opacity: 1;
      padding: var(--spacing-1);
      justify-content: flex-end;
      gap: var(--spacing-1);
      z-index: 10;
      border-radius: var(--border-radius-sm);

      @media (min-width: 641px) {
        position: static;
        padding: var(--spacing-2);
      }

      @media (min-width: 769px) {
        flex-direction: column;
      }
    }

		.action-button {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32px;
			height: 32px;
			border-radius: var(--border-radius-sm);
			background-color: var(--color-background);
			border: 1px solid var(--color-border);
			color: var(--color-text);
			cursor: pointer;
			transition: all 0.2s ease;
		}

		.action-button:hover {
			background-color: var(--color-background-hover);
		}

		.action-button.edit:hover {
			color: var(--color-primary);
			border-color: var(--color-primary);
		}

		.action-button.delete:hover {
			color: var(--color-danger);
			border-color: var(--color-danger);
		}

		.sr-only {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		}

		@media (max-width: 640px) {
			.article-author {
				grid-column: 1 / span 2;
				grid-row: 2;
			}

			.article-date {
				grid-column: 1 / span 2;
				grid-row: 3;
			}
		}
	}
</style>
