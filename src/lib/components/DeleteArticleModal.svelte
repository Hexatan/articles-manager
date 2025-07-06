<script lang="ts">
	import Modal from '$lib/components/ui/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { Article } from '$lib/types/article';

	interface Props {
		article: Article | null;
		isOpen: boolean;
		onConfirm: () => void;
		onCancel: () => void;
	}

	const { article, isOpen, onConfirm, onCancel }: Props = $props();
</script>

<!-- Delete Confirmation Modal -->
<Modal title="Confirm Deletion" {isOpen} size="sm" data-testid="delete-modal" onClose={onCancel}>
	{#snippet body()}
		<div>
			<p>Are you sure you want to delete the article "{article?.title}"?</p>
			<p>This action cannot be undone.</p>
		</div>
	{/snippet}
	{#snippet footer()}
		<div class="modal-actions">
			<Button variant="outline" onclick={onCancel} data-testid="cancel-delete-button">Cancel</Button
			>
			<Button variant="danger" onclick={onConfirm} data-testid="confirm-delete-button"
				>Delete</Button
			>
		</div>
	{/snippet}
</Modal>

<style>
	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--spacing-2);
	}
</style>
