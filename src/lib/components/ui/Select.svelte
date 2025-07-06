<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface Option {
		value: string;
		label: string;
	}

	interface Props extends HTMLSelectAttributes {
		name?: string;
		label?: string;
		options: Option[];
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		error?: string;
		fullWidth?: boolean;
	}

	let {
		name = '',
		label = '',
		options = [],
		value = $bindable(''),
		placeholder = 'Select an option',
		disabled = false,
		required = false,
		error = '',
		fullWidth = true,
		...props
	}: Props = $props();

	const uid = $props.id();
</script>

<div class="select-wrapper {fullWidth ? 'full-width' : ''} {error ? 'has-error' : ''}">
	{#if label}
		<label for={uid} class="label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	<div class="select-container">
		<select
			id={uid}
			{name}
			bind:value
			{disabled}
			{required}
			aria-invalid={!!error}
			aria-describedby={error ? `${uid}-error` : undefined}
			{...props}
		>
			<option value="" disabled selected hidden>{placeholder}</option>
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<div class="select-arrow" aria-hidden="true">
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
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		</div>
	</div>

	{#if error}
		<div class="error-message" id="{uid}-error">{error}</div>
	{/if}
</div>

<style>
	@layer components {
		.select-wrapper {
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

		.select-container {
			position: relative;
		}

		select {
			appearance: none;
			-webkit-appearance: none;
			width: 100%;
			padding: var(--spacing-2) var(--spacing-3);
			padding-right: var(--spacing-8);
			border: 1px solid var(--color-border);
			border-radius: var(--border-radius-md);
			font-size: var(--font-size-md);
			line-height: 1.5;
			color: var(--color-text);
			background-color: var(--color-background);
			cursor: pointer;
			transition:
				border-color var(--transition-fast),
				box-shadow var(--transition-fast);
		}

		select:focus {
			outline: none;
			border-color: var(--color-primary);
			box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
		}

		select:disabled {
			background-color: var(--color-background-alt);
			opacity: 0.7;
			cursor: not-allowed;
		}

		.select-arrow {
			position: absolute;
			right: var(--spacing-3);
			top: 50%;
			transform: translateY(-50%);
			pointer-events: none;
			color: var(--color-text-light);
		}

		.has-error select {
			border-color: var(--color-danger);
		}

		.has-error select:focus {
			box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
		}

		.error-message {
			font-size: var(--font-size-sm);
			color: var(--color-danger);
			margin-top: var(--spacing-1);
		}
	}
</style>
