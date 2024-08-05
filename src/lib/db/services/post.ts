import { db } from '..';
import { postTable } from '../schema';

export async function getAllPostsWithUser() {
	const posts = await db.query.postTable.findMany({
		with: {
			author: true
		}
	});
	return posts;
}

export async function addPost(content: string, authorId: string) {
	try {
		await db.insert(postTable).values({ content, authorId });
		return true;
	} catch (error) {
		console.error(`error: could not add post. ${error}`);
		return false;
	}
}
