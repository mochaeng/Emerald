<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import headerImage from '$lib/assets/header.webp';
	import avatarImage from '$lib/assets/avatar.png';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Separator } from '$lib/components/ui/separator';
	import PostCard from '$lib/components/PostCard.svelte';

	const photos: string[] = Object.values(
		import.meta.glob('$lib/assets/tweets/*', { eager: true, query: '?url', import: 'default' })
	);

	let prevScrollpos = 0;
	let profileHeader = $state<HTMLDivElement>();
	let profileName = 'Minatozaki Sana';
	let profileImg = { src: avatarImage, alt: '@sana_jyp' };
</script>

<svelte:window
	on:scroll={() => {
		if (!profileHeader) {
			return;
		}

		if (window.innerWidth >= 500) {
			profileHeader.style.top = '0';
			profileHeader.style.transition = 'top 0.3s ease-out';
			return;
		}

		let currentScrollPos = window.scrollY;
		if (prevScrollpos > currentScrollPos || currentScrollPos < 180) {
			profileHeader.style.top = '0';
			profileHeader.style.transition = 'top 0.3s ease-out';
		} else {
			profileHeader.style.transition = 'top 0.3s ease-out';
			profileHeader.style.top = '-64px';
		}
		prevScrollpos = currentScrollPos;
	}}
/>

<div class="w-full">
	<div
		bind:this={profileHeader}
		class="sticky top-0 z-10 flex h-14 w-full items-center gap-4 border-b-[2px] bg-white font-bold text-black"
	>
		<a href="/"><ArrowLeft /></a>
		<p>{profileName}</p>
	</div>

	<div class="h-[180px]">
		<img class="h-full w-full object-cover" src={headerImage} alt="Sana" />
	</div>

	<div class="flex flex-col gap-4 p-4">
		<div class="mt-[-50px]">
			<Avatar.Root class="h-28 w-28 border-2 border-white">
				<Avatar.Image src={avatarImage} alt="Sana" class="object-cover" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
		</div>
		<div class="flex flex-col gap-2">
			<div>
				<p class="text-lg font-medium">{profileName}</p>
				<p class="mb-2 text-sm text-slate-500">@sana_jyp</p>
			</div>
			<p>I'm sana. Singer from TWICE</p>
			<a href="/">jyp.com/</a>
		</div>
		<Separator />
	</div>

	<div class="flex flex-col gap-4">
		{#each photos as photo}
			<article>
				<PostCard
					{profileName}
					{profileImg}
					profileAt="sana_jyp"
					postText="Boa noite. Todos sabemos que a chaeyoung é maior que Lalisa"
					postImg={{ src: photo, alt: 'chaeyoung' }}
				/>
			</article>
		{/each}
	</div>
</div>
