<script lang="ts">
	import { browser } from '$app/environment';
	import { signUpFormSchema, type SignUpFormType } from '$lib/forms/schema';
	import { toast } from 'svelte-sonner';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { zodClient } from 'sveltekit-superforms/adapters';

	const { signUpForm }: { signUpForm: SignUpFormType } = $props();

	const form = superForm(signUpForm, {
		validators: zodClient(signUpFormSchema),
		onUpdated: ({ form: f }) => {
			if (!f.valid) {
				toast.error('Please fix the errors in the form.');
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

<form class="flex flex-col gap-4" method="POST" action="?/signUp" use:enhance>
	<h4>Log in</h4>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
			<Form.Description>Your public nickname.</Form.Description>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>E-mail</Form.Label>
			<Input {...attrs} bind:value={$formData.email} type="email" />
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
	<Form.Field {form} name="confirmationPassword">
		<Form.Control let:attrs>
			<Form.Label>Confirm password</Form.Label>
			<Input {...attrs} bind:value={$formData.confirmationPassword} type="password" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mb-4">SIGN UP</Form.Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
