<script lang="ts">
	import SapphireFrontPage from '$lib/components/SapphireFrontPage.svelte';
	import Timeline from '$lib/components/Timeline.svelte';

	let { data } = $props();
	let { signInForm, signUpForm, postTextForm, posts } = data;
</script>

{#if data.user}
	<Timeline {postTextForm} {posts} />
{:else}
	<SapphireFrontPage data={{ signInForm, signUpForm }} />
{/if}
