<script lang="ts">
	import { getAllPhotosFromFolder } from '$lib/utils';
	import { Check } from 'lucide-svelte';

	const userPhotos = getAllPhotosFromFolder('users');
</script>

<div class=" flex h-full w-full justify-center text-center">
	<section>
		<div class="relative mx-auto flex flex-col items-center justify-center text-center">
			<!-- <div class="absolute -top-20 left-0 hidden w-28 lg:block">
				<div
					class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-fuchsia-50 via-fuchsia-50/50"
				></div>
				<img src={logo} alt="The logo of the project" class="w-full" />
			</div> -->
			<h1
				class="relative mt-16 w-fit text-balance text-center text-5xl font-bold !leading-tight tracking-tighter text-gray-900 md:text-6xl lg:text-7xl"
			>
				A <span class="bg-blue-400 px-2 text-white">Safespace</span> for those who seek positivity in
				modern social media.
			</h1>
			<p class="mt-8 max-w-prose text-balance text-center text-lg md:text-wrap">
				Whether you are tired of social media negativity or want to try a new inclusive space, this
				is the place for you.
			</p>
			<ul class="mt-8 flex flex-col items-center space-y-2 font-medium">
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

			<div class="sm:flex-row sm:items-start mt-12 flex flex-col items-center gap-5">
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

			<div class="sm:items-start flex flex-col items-center justify-between pb-16">
				<div class="flex gap-0.5"></div>
				<p>
					<span class="font-semibold">nobody</span> joined LOL
				</p>
			</div>
		</div>

		<!-- <div class="flex w-full justify-center">
			<img
					src={wallpaper}
					class="sm:w-1/2 select-none rounded-md object-cover md:w-1/2 lg:w-full"
					alt="Twice with all nine members"
				/>
		</div> -->
	</section>
</div>
