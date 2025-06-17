import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: text('created_at'),
	accountType: integer('account_type').notNull().default(0), // 0 for customer, 1 for admin
	orderIDs: text('order_ids').notNull().default('[]')
});
