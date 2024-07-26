<script>
	import Header from '$lib/components/Header.svelte';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';

	let { children, data } = $props();
</script>

<Toaster />

<div class="relative flex flex-col justify-center md:flex-row">
	<Header user={data.user} />
	<main class="flex h-full w-full max-w-[1016px]">
		{@render children()}
		<!-- <div class="left-footer hidden w-[384px] max-w-[384px]">
			<a href="/">About</a>
			<a href="/">About</a>
			<a href="/">About</a>
		</div> -->
	</main>
</div>

<style>
	:global(body) {
		height: 100dvh;
		overflow: auto;
	}

	/* @media (width >= 1004px) {
		.left-footer {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	} */
</style>
