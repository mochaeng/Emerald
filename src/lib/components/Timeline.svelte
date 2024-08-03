<script lang="ts">
	import type { PostTextType } from '$lib/forms/schema';
	import PostTimelineCard from './PostTimelineCard.svelte';

	let { postTextForm }: { postTextForm: PostTextType } = $props();
</script>

<div class="w-full">
	<PostTimelineCard {postTextForm} />
</div>
