import { db } from '..';

export async function getAllPostsWithUser() {
	const posts = await db.query.postTable.findMany({
		with: {
			author: true
		}
	});
	return posts;
}
