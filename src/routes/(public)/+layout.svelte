<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	// State to control the visibility of the role switcher
	let showRoleSwitcher = $state(true);

	// Toggle the visibility of the role switcher
	function toggleRoleSwitcher() {
		showRoleSwitcher = !showRoleSwitcher;
	}
</script>

<div class="public-layout">
	<Header {showRoleSwitcher}>
		{#snippet actions()}
			<Button
				variant="secondary"
				onclick={() => {
					goto('/admin');
				}}
				>Go to admin
			</Button>
			<Button variant="secondary" onclick={toggleRoleSwitcher}
				>{showRoleSwitcher ? 'Hide' : 'Show'} Role Switcher
			</Button>
		{/snippet}
	</Header>

	<main class="main-content">
		<div class="container">
			{@render children()}
		</div>
	</main>

	<footer class="site-footer">
		<div class="container">
			<p>&copy; {new Date().getFullYear()} Article Manager</p>
		</div>
	</footer>
</div>

<style>
	.public-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.site-header {
		background-color: var(--color-primary);
		color: white;
		padding: var(--spacing-4) 0;
	}

	.site-title {
		margin: 0;
		font-size: var(--font-size-xl);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.main-content {
		flex: 1;
		padding: var(--spacing-6) 0;
	}

	.site-footer {
		background-color: var(--color-background-alt);
		padding: var(--spacing-4) 0;
		text-align: center;
		color: var(--color-text-light);
	}

	.container {
		width: 100%;
		margin: 0 auto;
		padding: 0 var(--spacing-4);

		@media (min-width: 768px) {
			max-width: 720px;
		}

		@media (min-width: 992px) {
			max-width: 960px;
		}

		@media (min-width: 1200px) {
			max-width: 1140px;
		}
	}
</style>
