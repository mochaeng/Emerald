<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex h-full flex-col">
	<Header />
	<main class="h-full w-full">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		height: 100dvh;
	}
</style>
