<script lang="ts">
	import type { User } from 'lucia';
	import { CircleUser, Home, Settings } from 'lucide-svelte';

	let { user }: { user: User | null } = $props();
</script>

<header>
	<nav>
		<ul>
			{#if user}
				<li>
					<a href="/">
						<CircleUser size={33} />
						<span>Account</span>
					</a>
				</li>
			{/if}
			<li>
				<a href="/">
					<Home size={33} />
					<span>Home</span>
				</a>
			</li>
			<li>
				<a href="/">
					<Settings size={33} />
					<span>More</span>
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	:root {
		--header-height: 3.5rem;
		--header-width: 4rem;
	}

	ul {
		list-style: none;
	}

	a {
		text-decoration: inherit;
	}

	:global(body) {
		height: 100dvh;
	}

	header {
		position: fixed;
		bottom: 0;
		height: var(--header-height);
		width: 100%;
		z-index: 100;
		order: 2;

		nav {
			height: 100%;
			width: 100%;
		}

		ul {
			width: 100%;
			height: 100%;
			padding: 0 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: white;
			border-top: 1px solid hsl(214.3 31.8% 91.4%);

			a {
				span {
					display: none;
				}
			}
		}
	}

	@media (width >= 500px) {
		header {
			position: sticky;
			top: 0;
			left: 0;
			bottom: 0;
			height: 100dvh;
			justify-content: start;
			width: var(--header-width);
			padding: 0;
			order: 0;

			ul {
				flex-direction: column;
				justify-content: start;
				padding: 1rem 0.5rem;
				gap: 1rem;
				border-top: 0;
				border-right: 1px solid hsl(214.3 31.8% 91.4%);
			}
		}
	}

	@media (width >= 616px) {
		header {
			width: 5rem;
		}
	}

	@media (width >= 1280px) {
		header {
			width: 17.5rem;

			ul {
				align-items: start;
				padding: 2rem 1rem;

				a {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 1rem;

					span {
						display: block;
					}
				}
			}
		}
	}
</style>
