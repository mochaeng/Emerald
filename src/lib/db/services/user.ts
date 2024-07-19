import { eq, or } from 'drizzle-orm';
import { db } from '..';
import { userTable } from '../schema';

export type UserService = {
	id: string;
	email: string;
	username: string;
};

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);
		if (user && user.length > 0) {
			return user[0];
		}
	} catch (error) {
		console.error(`error: could not retrieve user by email: ${error}`);
		return null;
	}
	return null;
};

export const getUserByUsername = async (username: string) => {
	try {
		const user = await db.select().from(userTable).where(eq(userTable.username, username)).limit(1);
		if (user && user.length > 0) {
			return user[0];
		}
		return null;
	} catch (error) {
		console.error(`error: could not retrieve user by username: ${error}`);
		return null;
	}
};

export async function insertUserWithPassword(user: UserService, passwordHash: string) {
	try {
		await db
			.insert(userTable)
			.values({ id: user.id, username: user.username, email: user.email, passwordHash });
		return true;
	} catch (error) {
		console.error(`error: could not insert user with password: ${error}`);
		return false;
	}
}

export const getUserByUsernameOrdEmail = async (username: string, email: string) => {
	try {
		const user = await db
			.select()
			.from(userTable)
			.where(or(eq(userTable.username, username), eq(userTable.email, email)))
			.limit(1);
		if (user.length > 0) {
			return user[0];
		}
		return null;
	} catch (error) {
		console.error(`error: could not retrieve user by username or email: ${error}`);
		return null;
	}
};

export async function getUserPosts(username: string) {
	const user = await db.query.userTable.findFirst({
		columns: {
			username: true
		},
		where: (usersTable, { eq }) => eq(usersTable.username, username),
		with: {
			posts: {
				limit: 10
			}
		}
	});
	if (user) {
		return user;
	}
	return null;
}
