<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<div class="app flex h-full justify-center">
	<Header user={data.user} />

	<main class="flex h-full w-full max-w-[1016px] justify-center pb-16">
		<div class="h-full w-full">
			{@render children()}
		</div>
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
