<script lang="ts">
	import type { SignInFormType, SignUpFormType } from '$lib/forms/schema';
	import { getAllPhotosFromFolder } from '$lib/utils';
	import { Check } from 'lucide-svelte';
	import AuthPanel from './AuthPanel.svelte';

	let {
		data
	}: {
		data: {
			signInForm: SignInFormType;
			signUpForm: SignUpFormType;
		};
	} = $props();

	const userPhotos = getAllPhotosFromFolder('users');
</script>

<div class="wrapper h-full w-full">
	<section class="flex w-full flex-col items-center gap-6 bg-blue-50 text-center">
		<h1
			class="mt-10 w-fit text-balance text-5xl font-bold !leading-tight tracking-tighter text-gray-900 md:text-5xl lg:text-6xl"
		>
			A <span class="bg-blue-400 px-2 text-white">Safeplace</span> for those who seek positivity in modern
			social media.
		</h1>
		<p class="max-w-prose text-balance p-4 text-center text-lg md:text-wrap">
			Whether you are tired of social media negativity or want to try a new inclusive space, this is
			the place for you.
		</p>
		<ul class="flex flex-col items-center space-y-2 font-medium">
			<div class="space-y-2">
				<li class="flex items-center gap-1.5">
					<Check class="ri-check-fill h-5 w-5 shrink-0 text-blue-600" />Positive and inclusive
					community
				</li>
				<li class="flex items-center gap-1.5">
					<Check class="ri-check-fill h-5 w-5 shrink-0 text-blue-600" />Connect to other people
				</li>
			</div>
		</ul>

		<div class="sm:flex-row sm:items-start flex flex-col items-center gap-5">
			<div class="flex -space-x-4">
				{#each userPhotos as userPhoto}
					<img
						class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
						src={userPhoto}
						alt="A user of casecobra"
					/>
				{/each}
			</div>
		</div>

		<div class="sm:items-start flex flex-col items-center justify-between">
			<div class="flex gap-0.5"></div>
			<p>
				<span class="font-semibold">nobody</span> joined LOL
			</p>
		</div>
	</section>

	<section class="h-full w-full bg-rose-50 p-2">
		<AuthPanel {data} />
		<!-- <div class="h-16"></div> -->
	</section>

	<!-- <div class="flex w-full justify-center">
			<img
					src={wallpaper}
					class="sm:w-1/2 select-none rounded-md object-cover md:w-1/2 lg:w-full"
					alt="Twice with all nine members"
				/>
		</div> -->
</div>

<style>
	@media (width >= 842px) {
		.wrapper {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(410px, 1fr));
		}
	}
</style>
