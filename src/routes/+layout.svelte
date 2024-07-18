<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex justify-center">
	<Header />

	<main class="flex w-full max-w-[1016px] pb-16 md:pb-0">
		<div class="w-full max-w-[632px] border-x-[1px]">
			{@render children()}
		</div>
		<div class="left-footer hidden w-[384px] max-w-[384px]">
			<a href="/">About</a>
			<a href="/">About</a>
			<a href="/">About</a>
		</div>
	</main>
</div>

<style>
	:global(body) {
		height: 100dvh;
		overflow: auto;
	}

	@media (width >= 1004px) {
		.left-footer {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
