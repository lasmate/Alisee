import { integer, primaryKey, sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { prices } from "./price";
import { quantities } from "./quantity";

export const items = sqliteTable("items", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    priceId: integer("price_id").references(prices.id),
    quantityId: integer("quantity_id").references(quantities.id),
    size: text("size"),
    customisable: text("customisable").notNull(),
});

export type Item = typeof items.$inferSelect