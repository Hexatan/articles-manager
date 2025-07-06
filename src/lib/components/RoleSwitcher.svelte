<script lang="ts">
	import { currentUser, login, logout } from '$lib/auth/auth.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="role-switcher">
	<h3>Demo Role Switcher</h3>
	<div class="buttons">
		<Button variant="primary" onclick={() => login('admin')}>Login as Admin</Button>
		<Button variant="secondary" onclick={() => login('editor')}>Login as Editor</Button>
		<Button variant="secondary" onclick={() => login('viewer')}>Login as Viewer</Button>
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
		margin: 2rem 0;
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
		background: var(--color-surface);
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}
</style>
