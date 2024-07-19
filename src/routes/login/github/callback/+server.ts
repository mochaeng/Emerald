import { createSessionCookieFromUserId, github } from '$lib/server/auth';
import type { RequestEvent } from '../$types';
import { generateIdFromEntropySize } from 'lucia';
import { OAuth2RequestError } from 'arctic';
import { getUserByEmail, type UserService } from '$lib/db/services/user';
import {
	getUserIdFromOauthAccount,
	insertOauthAccount,
	type OauthProviderService
} from '$lib/db/services/oauthProvider';
import { addUserWithOauth } from '$lib/db/transactions';

async function getGitHubUserEmails(accessToken: string) {
	try {
		const emailsResponse = await fetch('https://api.github.com/user/emails', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		const emails: GitHubEmail[] = await emailsResponse.json();
		return emails;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function getGitHubUser(accessToken: string) {
	try {
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'User-Agent': 'my-app'
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();
		return githubUser;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, { status: 400 });
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);

		const githubUser = await getGitHubUser(tokens.accessToken);
		if (!githubUser) {
			return new Response('No GitHub user', { status: 204 });
		}

		const emails = await getGitHubUserEmails(tokens.accessToken);
		if (!emails || emails.length == 0) {
			return new Response('No e-mails returned from GitHub API', { status: 400 });
		}

		const primaryEmail = emails.find((email) => email.primary) ?? null;
		if (!primaryEmail) {
			return new Response('No primary email address', {
				status: 400
			});
		}
		if (!primaryEmail.verified) {
			return new Response('Unverified email', { status: 400 });
		}

		const existingUser = await getUserByEmail(primaryEmail.email);
		if (existingUser) {
			const id = await getUserIdFromOauthAccount('github', githubUser.id);
			if (!id) {
				const isAdded = await insertOauthAccount({
					providerId: 'github',
					providerUserId: githubUser.id,
					userId: existingUser.id
				});

				if (!isAdded) {
					return new Response('Could not add OauthAccount', { status: 500 });
				}
			}

			const sessionCookie = await createSessionCookieFromUserId(existingUser.id);
			if (!sessionCookie) {
				return new Response('Could not create cookie session', { status: 500 });
			}

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateIdFromEntropySize(10);

			const user: UserService = {
				id: userId,
				email: primaryEmail.email,
				username: githubUser.login
			};
			const oauth: OauthProviderService = {
				providerUserId: githubUser.id,
				userId: userId,
				providerId: 'github'
			};
			const isTransactionSuccessful = await addUserWithOauth(user, oauth);
			if (!isTransactionSuccessful) {
				return new Response('Transaction failed', { status: 500 });
			}

			const sessionCookie = await createSessionCookieFromUserId(userId);
			if (!sessionCookie) {
				return new Response('Could not create cookie session', { status: 500 });
			}

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}

		return new Response(null, {
			status: 302,
			headers: { Location: '/' }
		});
	} catch (error) {
		console.error(error);
		if (error instanceof OAuth2RequestError) {
			return new Response(null, { status: 400 });
		}
		return new Response(null, { status: 500 });
	}
}
