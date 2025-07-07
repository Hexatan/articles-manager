<script lang="ts">
	import type { Snippet } from 'svelte';
	import { currentUser, logout } from '$lib/auth/auth.svelte';
	import Header from '$lib/components/Header.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	// Navigation items for the admin sidebar
	const navItems = [
		{ label: 'Public Site', href: '/', icon: 'home' },
		{ label: 'Dashboard', href: '/admin', icon: 'dashboard' },
		{ label: 'Articles', href: '/admin/articles', icon: 'article' }
	];

	let sidebarOpen = $state(true);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function handleLogout() {
		logout();
		window.location.href = '/';
	}
</script>

<div class="admin-layout">
	<!-- Sidebar -->
	<aside class="sidebar {sidebarOpen ? 'open' : 'closed'}">
		<div class="sidebar-header">
			<h1 class="logo">Article Manager</h1>
			<button class="sidebar-toggle" onclick={toggleSidebar} aria-label="Toggle sidebar">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
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
		</div>

		<nav class="sidebar-nav">
			<ul>
				{#each navItems as item (item.href)}
					<li>
						<a href={item.href} class="nav-link">
							<span class="nav-icon">
								{#if item.icon === 'home'}
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
										<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
										<polyline points="9 22 9 12 15 12 15 22"></polyline>
									</svg>
								{:else if item.icon === 'dashboard'}
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
										<rect x="3" y="3" width="7" height="7"></rect>
										<rect x="14" y="3" width="7" height="7"></rect>
										<rect x="14" y="14" width="7" height="7"></rect>
										<rect x="3" y="14" width="7" height="7"></rect>
									</svg>
								{:else if item.icon === 'article'}
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
										<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
										<polyline points="14 2 14 8 20 8"></polyline>
										<line x1="16" y1="13" x2="8" y2="13"></line>
										<line x1="16" y1="17" x2="8" y2="17"></line>
										<polyline points="10 9 9 9 8 9"></polyline>
									</svg>
								{/if}
							</span>
							<span class="nav-text">{item.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<!-- Main content area -->
	<div class="content-wrapper">
		<!-- Header -->
		<Header variant="admin">
			{#snippet leftAction()}
				<button class="mobile-menu-button" onclick={toggleSidebar} aria-label="Toggle menu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				</button>
			{/snippet}
			{#snippet actions()}
				<div class="user-profile">
					<span class="user-name">{currentUser?.user?.name || 'Guest'}</span>
					<div class="avatar">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
					</div>
					<button class="logout-button" onclick={handleLogout} aria-label="Logout">
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
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
							<polyline points="16 17 21 12 16 7"></polyline>
							<line x1="21" y1="12" x2="9" y2="12"></line>
						</svg>
					</button>
				</div>
			{/snippet}
		</Header>

		<!-- Main content -->
		<main class="main-content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.admin-layout {
		display: flex;
		min-height: 100vh;
		background-color: var(--color-background-alt);
	}

	/* Sidebar */
	.sidebar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 280px;
		max-width: 85%;
		background-color: var(--color-primary-dark);
		border-right: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		transition:
			width var(--transition-normal),
			transform var(--transition-normal);
		z-index: 10;
		transform: translateX(-100%);
		overflow-y: auto; /* Allow scrolling on small screens */

		@media (min-width: 769px) {
			position: relative;
			width: 250px;
			transform: translateX(0);
			box-shadow: none;
			max-width: none;
		}
	}

	.sidebar.open {
		transform: translateX(0);
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-4);
	}

	.logo {
		font-size: var(--font-size-md);
		font-weight: 700;
		color: var(--color-text-inverse);
		margin: 0;

		@media (min-width: 769px) {
			font-size: var(--font-size-lg);
		}
	}

	.sidebar-toggle {
		display: block;
		background: transparent;
		border: none;
		color: var(--color-text-light);
		cursor: pointer;
		padding: var(--spacing-2);

		@media (min-width: 769px) {
			display: none;
		}
	}

	.sidebar-nav {
		padding: var(--spacing-2) 0;
		flex: 1;

		@media (min-width: 769px) {
			padding: var(--spacing-4) 0;
		}
	}

	.sidebar-nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav-link {
		display: flex;
		align-items: center;
		padding: var(--spacing-3) var(--spacing-4);
		color: var(--color-text-inverse);
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.nav-link:hover {
		color: var(--color-text);
		background-color: var(--color-background-alt);
		text-decoration: none;

		.nav-icon {
			color: var(--color-text);
		}
	}

	.nav-icon {
		margin-right: var(--spacing-3);
		display: flex;
		align-items: center;
		color: var(--color-text-inverse);
	}

	/* Mobile menu button */
	.mobile-menu-button {
		display: block;
		background: transparent;
		border: none;
		color: var(--color-text);
		cursor: pointer;

		@media (min-width: 769px) {
			display: none;
		}
	}

	.user-profile {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		flex-wrap: wrap;

		@media (min-width: 769px) {
			flex-wrap: nowrap;
		}
	}

	.user-name {
		font-weight: 500;
		font-size: var(--font-size-sm);
		order: 2;

		@media (min-width: 769px) {
			font-size: var(--font-size-md);
			order: 1;
		}
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: var(--border-radius-full);
		background-color: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		order: 1;

		@media (min-width: 769px) {
			order: 2;
		}
	}

	.logout-button {
		background: transparent;
		border: none;
		color: var(--color-text-muted);
		cursor: pointer;
		padding: var(--spacing-1);
		border-radius: var(--border-radius-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			color var(--transition-fast),
			background-color var(--transition-fast);
	}

	.logout-button:hover {
		color: var(--color-danger);
		background-color: var(--color-surface-variant);
	}

	/* Content area */
	.content-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.main-content {
		flex: 1;
		padding: var(--spacing-3);
		overflow-y: auto;

		@media (min-width: 769px) {
			padding: var(--spacing-6);
		}
	}
</style>
