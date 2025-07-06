<script lang="ts">
	import { currentUser, login, logout } from '$lib/auth/auth.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		isInline?: boolean;
	}

	const { isInline = false }: Props = $props();
</script>

<div class="role-switcher {isInline ? 'inline' : ''}">
	<div class="buttons">
		<Button variant="secondary" onclick={() => login('admin')}
			>{isInline ? 'Admin' : 'Login as Admin'}</Button
		>
		<Button variant="secondary" onclick={() => login('editor')}
			>{isInline ? 'Editor' : 'Login as Editor'}</Button
		>
		<Button variant="secondary" onclick={() => login('viewer')}
			>{isInline ? 'Viewer' : 'Login as Viewer'}</Button
		>
		<Button variant="danger" onclick={logout}>Logout</Button>
	</div>
	<div class="current-user">
		{#if currentUser.user}
			<p>Logged in as: <strong>{currentUser.user?.name}</strong></p>
			<p>Roles: {currentUser.user?.roles?.join(', ')}</p>
		{:else}
			<p>Not logged in</p>
		{/if}
	</div>
</div>

<style>
	.role-switcher {
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		background: var(--color-surface);

		&.inline {
			border: none;
		}
	}

	/* When used in the header, we want more compact styling */
	:global(.header-actions) .role-switcher {
		margin: 0;
		padding: 0.5rem;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 0.5rem;
	}

	/* Smaller text in the header context */
	:global(.header-actions) .role-switcher h3 {
		font-size: var(--font-size-sm);
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	:global(.header-actions) .current-user {
		font-size: var(--font-size-xs);
	}

	:global(.header-actions) .current-user p {
		margin: 0.25rem 0;
	}
</style>
