<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface Props extends HTMLFormAttributes {
		title?: string;
		author?: string;
		status?: string;
		errors?: Record<string, string[]>;
		formError?: string | null;
		isSubmitting?: boolean;
		submitLabel?: string;
	}

	// Props with defaults
	let {
		title = $bindable(''),
		author = $bindable(''),
		status = $bindable(''),
		errors = {},
		formError = null,
		isSubmitting = false,
		submitLabel = 'Save',
		...formProps
	}: Props = $props();

	// Status options for the select
	const statusOptions = [
		{ value: 'published', label: 'Published' },
		{ value: 'draft', label: 'Draft' },
		{ value: 'in_review', label: 'In Review' }
	];
</script>

{#if formError}
	<Alert variant="error" title="Error">
		{formError}
	</Alert>
{/if}

<form {...formProps} novalidate>
	<Input
		name="title"
		label="Title"
		placeholder="Enter article title"
		bind:value={title}
		error={errors?.title?.[0]}
		required
	/>

	<Input
		name="author"
		label="Author"
		placeholder="Enter author name"
		bind:value={author}
		error={errors?.author?.[0]}
		required
	/>

	<Select
		name="status"
		label="Status"
		options={statusOptions}
		bind:value={status}
		error={errors?.status?.[0]}
		required
	/>

	<div class="form-actions">
		<Button variant="outline" onclick={() => history.back()}>
			Cancel
		</Button>
		<Button
			btnType="submit"
			variant="primary"
			loading={isSubmitting}
			disabled={isSubmitting}
		>
			{isSubmitting ? 'Saving...' : submitLabel}
		</Button>
	</div>
</form>

<style>
    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-4);
        margin-top: var(--spacing-6);
    }
</style>
