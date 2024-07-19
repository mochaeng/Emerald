import { fail, redirect, type Actions } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { lucia } from '$lib/server/auth';
import { getUserByUsernameOrdEmail, insertUserWithPassword } from '$lib/db/services/user';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const email = formData.get('email');

		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: 'Invalid username'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}
		if (typeof email !== 'string') {
			return fail(400, {
				message: 'Invalid email'
			});
		}

		const userId = generateIdFromEntropySize(10);
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		const existedUser = await getUserByUsernameOrdEmail(username, email);
		if (!existedUser) {
			insertUserWithPassword({ id: userId, username, email }, passwordHash);
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			redirect(302, '/');
		}
		console.log('usernmae has been taked');
		return fail(400, { message: 'Username already taked' });
	}
};
