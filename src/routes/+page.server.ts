import { getAllPostsWithUser } from '$lib/db/services/post';
import { redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// if (!event.locals.user) {
	// 	redirect(302, '/login');
	// }

	const posts = await getAllPostsWithUser();

	console.log(posts);
	console.log(event.locals.user);

	return {
		posts: posts,
		user: event.locals.user
	};
};
