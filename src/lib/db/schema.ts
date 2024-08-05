import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').unique().notNull(),
	username: text('username').unique().notNull(),
	passwordHash: text('password_hash'),
	createdAt: timestamp('created_at')
});

export const userRelations = relations(userTable, ({ many }) => ({
	posts: many(postTable)
}));

export const postTable = pgTable('post', {
	id: serial('id').primaryKey(),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	authorId: text('author_id')
		.notNull()
		.references(() => userTable.id)
});

export const postRelations = relations(postTable, ({ one }) => ({
	author: one(userTable, {
		fields: [postTable.authorId],
		references: [userTable.id]
	})
}));

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const oauthAccountTable = pgTable(
	'oauth_account',
	{
		provider_id: text('provider_id').notNull(),
		provider_user_id: text('provider_user_id').notNull(),
		user_id: text('user_id')
			.notNull()
			.references(() => userTable.id)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.provider_id, table.provider_user_id] })
		};
	}
);
