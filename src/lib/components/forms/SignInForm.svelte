<script lang="ts">
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { signInFormSchema, type SignInFormType } from '$lib/forms/schema';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	const { signInForm }: { signInForm: SignInFormType } = $props();

	const form = superForm(signInForm, {
		validators: zodClient(signInFormSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

<form class="flex flex-col gap-4" method="POST" action="?/signIn" use:enhance>
	<h4>Log in</h4>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} type="password" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mb-4">LOGIN</Form.Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
