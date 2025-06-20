import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const img_list = sqliteTable('img_list', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	img_path: text('img_path').notNull().unique()
});
