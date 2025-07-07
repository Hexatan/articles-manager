<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLDialogAttributes, 'size'> {
		title: string;
		isOpen?: boolean;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
		size?: 'sm' | 'md' | 'lg';
		body: Snippet;
		footer?: Snippet;
		onClose?: () => void;
	}

	let {
		title,
		isOpen = false,
		closeOnEscape = true,
		closeOnOutsideClick = true,
		size = 'md',
		body,
		footer,
		onClose,
		...props
	}: Props = $props();

	let dialogElement: HTMLDialogElement;
	let open = $state(isOpen);

	// Sync open state with isOpen prop
	$effect(() => {
		open = isOpen;
		if (open && dialogElement) {
			dialogElement.showModal();
		} else if (dialogElement && dialogElement.open) {
			dialogElement.close();
		}
	});

	// Handle escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && closeOnEscape) {
			close();
		}
	}

	// Handle outside click
	function handleOutsideClick(event: MouseEvent) {
		if (closeOnOutsideClick && event.target === dialogElement) {
			close();
		}
	}

	// Close the modal
	function close() {
		open = false;
		if (onClose) onClose();
	}
</script>

<dialog
	bind:this={dialogElement}
	class="modal {size}"
	onkeydown={handleKeydown}
	onclick={handleOutsideClick}
	aria-labelledby="modal-title"
	aria-modal="true"
	{...props}
>
	<div class="modal-content">
		<header class="modal-header">
			<h2 id="modal-title" class="modal-title">{title}</h2>
			<button type="button" class="modal-close" aria-label="Close modal" onclick={close}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</header>

		<div class="modal-body">
			{@render body()}
		</div>

		{#if footer}
			<footer class="modal-footer">
				{@render footer()}
			</footer>
		{/if}
	</div>
</dialog>

<style>
	@layer components {
		.modal {
			padding: 0;
			border: none;
			border-radius: var(--border-radius-lg);
			box-shadow: var(--shadow-lg);
			max-width: 90vw;
			max-height: 90vh;
			overflow: hidden;
			margin: auto;
			background-color: var(--color-background);
			color: var(--color-text);
		}

		.modal::backdrop {
			background-color: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(2px);
		}

		.sm {
			width: 400px;
		}

		.md {
			width: 600px;
		}

		.lg {
			width: 800px;
		}

		.modal-content {
			display: flex;
			flex-direction: column;
			max-height: 90vh;
		}

		.modal-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: var(--spacing-4);
			border-bottom: 1px solid var(--color-border);
		}

		.modal-title {
			font-size: var(--font-size-xl);
			font-weight: 600;
			color: var(--color-text);
			margin: 0;
		}

		.modal-close {
			background: transparent;
			border: none;
			cursor: pointer;
			padding: var(--spacing-1);
			color: var(--color-text-light);
			transition: color var(--transition-fast);
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: var(--border-radius-full);
		}

		.modal-close:hover {
			color: var(--color-text);
			background-color: var(--color-background-alt);
		}

		.modal-body {
			padding: var(--spacing-4);
			overflow-y: auto;
			flex: 1;
		}

		.modal-footer {
			display: flex;
			justify-content: flex-end;
			gap: var(--spacing-2);
			padding: var(--spacing-4);
			border-top: 1px solid var(--color-border);
			background-color: var(--color-background-alt);
		}
	}
</style>
