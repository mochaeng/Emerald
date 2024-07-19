import { db } from '.';
import { oauthAccountTable, userTable } from './schema';
import type { OauthProviderService } from './services/oauthProvider';
import type { UserService } from './services/user';

export async function addUserWithOauth(user: UserService, oauth: OauthProviderService) {
	try {
		await db.transaction(async (tx) => {
			await tx
				.insert(userTable)
				.values({ id: user.id, email: user.email, username: user.username });
			await tx.insert(oauthAccountTable).values({
				provider_id: oauth.providerId,
				provider_user_id: oauth.providerUserId,
				user_id: oauth.userId
			});
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
