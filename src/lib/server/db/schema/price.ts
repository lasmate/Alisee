import { integer, primaryKey, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { items } from "./Item";

export const prices = sqliteTable("prices", {
    id: integer("id").primaryKey(),
    itemId: integer("item_id").references(items.id),
    price: real("price").notNull(),
});