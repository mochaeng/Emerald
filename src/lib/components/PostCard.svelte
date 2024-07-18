<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';

	type Props = {
		postImg: {
			src: string;
			alt: string;
		};
		profileImg: {
			src: string;
			alt: string;
		};
		profileName: string;
		profileAt: string;
		postText: string;
	};

	let { profileName, profileAt, postText, postImg, profileImg }: Props = $props();
</script>

<div class="flex h-full w-full flex-col gap-2 border-y-2">
	<div class="flex items-center justify-between p-2">
		<div class="flex gap-2">
			<Avatar.Root>
				<Avatar.Image src={profileImg.src} alt={profileImg.alt} class="object-cover" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<div>
				<p>{profileName}</p>
				<p class="text-sm text-slate-500">@{profileAt}</p>
			</div>
		</div>
		<p>18 Jul</p>
	</div>

	<div class="flex h-full flex-col gap-2">
		<p class="p-2 text-start">{postText}</p>

		<div class="lg:h-[800px]">
			<img
				src={postImg.src}
				alt={postImg.alt}
				class="w-full rounded-sm object-contain lg:h-[800px]"
			/>
		</div>
	</div>
</div>
