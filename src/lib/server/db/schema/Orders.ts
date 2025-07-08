import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { item } from './Item';
import { sql } from 'drizzle-orm';
import { users } from './Users';

export const orders = sqliteTable('orders', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id').notNull().references(() => users.id),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	address: text('address').notNull(),
	city: text('city').notNull(),
	postalCode: text('postal_code').notNull(),
	country: text('country').notNull(),
	totalPrice: integer('total_price').notNull(), 
	items: text('items').notNull(), // JSON string of cart items
	status: text('status').notNull().default('pending'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	processedAt: integer('processed_at', { mode: 'timestamp' }),
	shippedAt: integer('shipped_at', { mode: 'timestamp' }),
	isCompleted: integer('is_completed', { mode: 'boolean' }).notNull().default(false)
});
