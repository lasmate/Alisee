import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    surname: text("surname").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    createdAt: text("created_at"),
    accountType: text("account_type").notNull(),
    orderIDs: text("order_ids").notNull().default("[]"),
});