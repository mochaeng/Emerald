import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserPosts } from '$lib/db/services/user';

export const load: PageServerLoad = async ({ params }) => {
	console.log(params.username);
	// const user = await getUserPosts(params.username);
	// if (!user) {
	// 	error(404, 'Not found');
	// }
	// return user;
};
