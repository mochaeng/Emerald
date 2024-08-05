<script lang="ts">
	import avatarImage from '$lib/assets/avatar.png';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Avatar from '$lib/components/ui/avatar';
	import Separator from './ui/separator/separator.svelte';
	import { postTextSchema, type PostTextType } from '$lib/forms/schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';

	let { postTextForm }: { postTextForm: PostTextType } = $props();
	const form = superForm(postTextForm, {
		validators: zodClient(postTextSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`Posted succesfully`);
			} else {
				toast.error('Please fix the errors before posting.');
			}
		}
	});
	const { form: formData, enhance } = form;

	let isDisabled = $derived(() => {
		const textSize = $formData.textContent.trim().length;
		return textSize === 0 || textSize > 144;
	});
</script>

<div class="flex w-full gap-2 bg-slate-200 p-4">
	<div class="">
		<Avatar.Root>
			<Avatar.Image src={avatarImage} alt="user profile pic" class="object-cover" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div class="h-full w-full bg-rose-100">
		<form class="flex flex-col gap-2 p-2" method="POST" action="?/addPost" use:enhance>
			<Form.Field {form} name="textContent">
				<Form.Control let:attrs>
					<Textarea
						{...attrs}
						class="max-h-full resize-none"
						placeholder="What's happening?!"
						bind:value={$formData.textContent}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Separator class="bg-rose-500" />
			<Form.Button class="mb-4" disabled={isDisabled()}>Post</Form.Button>
		</form>
	</div>
</div>
