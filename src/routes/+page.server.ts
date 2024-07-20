import { getAllPostsWithUser } from '$lib/db/services/post';
import { redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { loginFormSchema } from '$lib/forms/schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	// if (!event.locals.user) {
	// 	redirect(302, '/login');
	// }

	const posts = await getAllPostsWithUser();
	console.log(posts);

	return {
		posts: posts,
		user: event.locals.user,
		form: await superValidate(zod(loginFormSchema))
	};
};
