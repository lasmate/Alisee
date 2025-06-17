import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { item } from './Item';
import { sql } from 'drizzle-orm';
import { users } from './Users';

export const orders = sqliteTable('orders', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	itemId: integer('item_id').references(() => item.id),
	userId: integer('user_id').references(() => users.id),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	processedAt: text('processed_at'),
	shippedAt: text('shipped_at'),
	shippingAddress: text('shipping_address'),
	price: integer('price'),
	isCompleted: integer('is_completed', { mode: 'boolean' }).default(false)
});
