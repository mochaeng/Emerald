<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import type { PostWithUser } from '$lib/db/services/post';

	import avatarImage from '$lib/assets/avatar.png';

	let { post }: { post: PostWithUser } = $props();
</script>

<div class="flex h-full w-full flex-col gap-2 border-2">
	<div class="flex items-center justify-between p-2">
		<div class="flex gap-2">
			<Avatar.Root>
				<Avatar.Image src={avatarImage} alt="sana from twice" class="object-cover" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<div>
				<p>sana</p>
				<p class="text-sm text-slate-500">@{post.author.username}</p>
			</div>
		</div>
		<p>18 Jul</p>
	</div>

	<div class="flex h-full flex-col gap-2">
		<p class="p-2 text-start">{post.content}</p>

		<!-- <div class="lg:h-[800px]">
			<img
				src={postImg.src}
				alt={postImg.alt}
				class="w-full rounded-sm object-contain lg:h-[800px]"
			/>
		</div> -->
	</div>
</div>
