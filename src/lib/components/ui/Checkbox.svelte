<script lang="ts">
	interface Props {
		name?: string;
		label: string;
		checked?: boolean;
		disabled?: boolean;
		required?: boolean;
		error?: string;
	}

	let {
		name = '',
		label,
		checked = false,
		disabled = false,
		required = false,
		error = ''
	}: Props = $props();

	const uid = $props.id();
</script>

<div class="checkbox-wrapper {error ? 'has-error' : ''}">
	<div class="checkbox-container">
		<input
			id={uid}
			type="checkbox"
			{name}
			bind:checked
			{disabled}
			{required}
			aria-invalid={!!error}
			aria-describedby={error ? `${uid}-error` : undefined}
		/>
		<label for={uid} class="label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	</div>

	{#if error}
		<div class="error-message" id="{uid}-error">{error}</div>
	{/if}
</div>

<style>
	@layer components {
		.checkbox-wrapper {
			display: flex;
			flex-direction: column;
			margin-bottom: var(--spacing-4);
		}

		.checkbox-container {
			display: flex;
			align-items: center;
		}

		input[type='checkbox'] {
			appearance: none;
			-webkit-appearance: none;
			width: 1.25rem;
			height: 1.25rem;
			border: 1px solid var(--color-border);
			border-radius: var(--border-radius-sm);
			background-color: var(--color-background);
			margin-right: var(--spacing-2);
			position: relative;
			cursor: pointer;
			transition:
				background-color var(--transition-fast),
				border-color var(--transition-fast);
		}

		input[type='checkbox']:checked {
			background-color: var(--color-primary);
			border-color: var(--color-primary);
		}

		input[type='checkbox']:checked::after {
			content: '';
			position: absolute;
			left: 0.4rem;
			top: 0.2rem;
			width: 0.25rem;
			height: 0.5rem;
			border: solid white;
			border-width: 0 2px 2px 0;
			transform: rotate(45deg);
		}

		input[type='checkbox']:focus {
			outline: none;
			border-color: var(--color-primary);
			box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
		}

		input[type='checkbox']:disabled {
			background-color: var(--color-background-alt);
			border-color: var(--color-border);
			opacity: 0.7;
			cursor: not-allowed;
		}

		input[type='checkbox']:disabled + label {
			opacity: 0.7;
			cursor: not-allowed;
		}

		.label {
			font-size: var(--font-size-md);
			color: var(--color-text);
			cursor: pointer;
		}

		.required {
			color: var(--color-danger);
			margin-left: var(--spacing-1);
		}

		.has-error input[type='checkbox'] {
			border-color: var(--color-danger);
		}

		.has-error input[type='checkbox']:focus {
			box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
		}

		.error-message {
			font-size: var(--font-size-sm);
			color: var(--color-danger);
			margin-top: var(--spacing-1);
			margin-left: calc(1.25rem + var(--spacing-2));
		}
	}
</style>
