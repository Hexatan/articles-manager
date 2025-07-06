<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	import RoleSwitcher from '$lib/components/RoleSwitcher.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="public-layout">
	<header class="site-header">
		<div class="container">
			<h1 class="site-title">Article Manager</h1>
			<Button
				variant="secondary"
				onclick={() => {
					goto('/admin');
				}}
				>Go to admin
			</Button>
		</div>
	</header>

	<main class="main-content">
		<div class="container">
			<RoleSwitcher />
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
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-4);
	}
</style>
