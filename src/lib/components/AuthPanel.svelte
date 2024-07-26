<script lang="ts">
	import type { SignInFormType, SignUpFormType } from '$lib/forms/schema';
	import SignInForm from './forms/SignInForm.svelte';
	import SignUpForm from './forms/SignUpForm.svelte';
	import githubmark from '$lib/assets/icons/github-mark.svg';

	let {
		data
	}: {
		data: {
			signInForm: SignInFormType;
			signUpForm: SignUpFormType;
		};
	} = $props();

	let isLoginIn = $state(true);
</script>

<div class="px-4 md:px-6 lg:px-10">
	{#if isLoginIn}
		<SignInForm signInForm={data.signInForm} />
	{:else}
		<SignUpForm signUpForm={data.signUpForm} />
	{/if}
	<div>
		<span>
			{#if isLoginIn}
				Don't have an account?
			{:else}
				<span>Already have an account? </span>
			{/if}

			<button
				onclick={() => (isLoginIn = !isLoginIn)}
				class="bg-transparent text-sm text-[#00aff0]"
			>
				{#if isLoginIn}
					Sign up for Sapphire
				{:else}
					Login
				{/if}
			</button>
		</span>
	</div>
	<div class="mt-8 flex justify-center">
		<a class="flex w-full justify-center gap-2 rounded-xl bg-rose-500 py-2" href="/login/github">
			<img width="24" height="24" src={githubmark} alt="github mark" />
			<span>Sign in with Github</span>
		</a>
	</div>
</div>
