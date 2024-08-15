import { db } from '..';
import { postTable } from '../schema';

export type PostWithUser = {
	id: number;
	content: string;
	createdAt: Date;
	authorId: string;
	author: { username: string };
};

export async function getAllPostsWithUser() {
	const posts: PostWithUser[] = await db.query.postTable.findMany({
		with: {
			author: {
				columns: { username: true }
			}
		},
		limit: 10
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
