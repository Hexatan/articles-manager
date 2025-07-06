<script lang="ts">

	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	interface Props {
		inputType?: HTMLInputTypeAttribute;
		name?: string;
		value?: string;
		placeholder?: string;
		label?: string;
		error?: string;
		disabled?: boolean;
		required?: boolean;
		fullWidth?: boolean;
	}

	let {
		inputType = 'text',
		name = '',
		value = '',
		placeholder = '',
		label = '',
		error = '',
		disabled = false,
		required = false,
		fullWidth = true
	}: Props = $props();

	const uid = $props.id();

</script>

<div class="input-wrapper {fullWidth ? 'full-width' : ''} {error ? 'has-error' : ''}">
	{#if label}
		<label for={uid} class="label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	<input
		id={uid}
		type={inputType}
		{name}
		bind:value
		{placeholder}
		{disabled}
		{required}
		aria-invalid={!!error}
		aria-describedby={error ? `${uid}-error` : undefined}
	/>

	{#if error}
		<div class="error-message" id="{uid}-error">{error}</div>
	{/if}
</div>

<style>
    @layer components {
        .input-wrapper {
            display: flex;
            flex-direction: column;
            margin-bottom: var(--spacing-4);
        }

        .label {
            font-size: var(--font-size-sm);
            font-weight: 500;
            margin-bottom: var(--spacing-1);
            color: var(--color-text);
        }

        .required {
            color: var(--color-danger);
            margin-left: var(--spacing-1);
        }

        input {
            padding: var(--spacing-2) var(--spacing-3);
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius-md);
            font-size: var(--font-size-md);
            line-height: 1.5;
            color: var(--color-text);
            background-color: var(--color-background);
            transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        input:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        input:disabled {
            background-color: var(--color-background-alt);
            opacity: 0.7;
            cursor: not-allowed;
        }

        .has-error input {
            border-color: var(--color-danger);
        }

        .has-error input:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .error-message {
            font-size: var(--font-size-sm);
            color: var(--color-danger);
            margin-top: var(--spacing-1);
        }

    }
</style>