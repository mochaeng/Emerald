import { and, eq } from 'drizzle-orm';
import { db } from '..';
import { oauthAccountTable } from '../schema';

export type OauthProviderService = {
	providerId: string;
	providerUserId: string;
	userId: string;
};

export async function getUserIdFromOauthAccount(provider_id: string, provider_user_id: string) {
	try {
		const id = await db
			.select()
			.from(oauthAccountTable)
			.where(
				and(
					eq(oauthAccountTable.provider_id, provider_id),
					eq(oauthAccountTable.provider_user_id, provider_user_id)
				)
			)
			.limit(1);
		if (id && id.length > 0) {
			return id;
		}
		return null;
	} catch (error) {
		console.error(`error: could not retrieve userId from oauth account: ${error}`);
		return null;
	}
}

export async function insertOauthAccount(oauth: OauthProviderService) {
	try {
		await db
			.insert(oauthAccountTable)
			.values({
				provider_id: oauth.providerId,
				provider_user_id: oauth.providerUserId,
				user_id: oauth.userId
			});
		return true;
	} catch (error) {
		console.error(`error: could not insert oauth account: ${error}`);
		return false;
	}
}
