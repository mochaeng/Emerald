import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	console.log(`on server layout: ${locals.user}`);
	return {
		user: locals.user
	};
};
