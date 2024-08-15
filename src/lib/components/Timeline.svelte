<script lang="ts">
	import type { PostWithUser } from '$lib/db/services/post';
	import type { PostTextType } from '$lib/forms/schema';
	import PostCard from './PostCard.svelte';
	import PostTimelineCard from './PublisherPostCard.svelte';

	let { postTextForm, posts }: { postTextForm: PostTextType; posts: PostWithUser[] } = $props();

	console.log(posts);
</script>

<div class="w-full">
	<PostTimelineCard {postTextForm} />

	<div>
		{#each posts as post}
			<PostCard {post} />
		{/each}
	</div>
</div>
