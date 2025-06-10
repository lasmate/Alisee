import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { items } from "./Item";

export const quantities = sqliteTable("quantities", {
    id: integer("id").primaryKey(),
    itemId: integer("item_id").references(items.id),
    quantity: integer("quantity").notNull(),
});