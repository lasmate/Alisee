import { integer, primaryKey, sqliteTable, text, } from "drizzle-orm/sqlite-core";
export const item = sqliteTable("items", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description")
        .notNull(),
    image: text("image").notNull(),
    size: text("size"),
    price: integer("price")
        .notNull(),
    quantity: integer("quantity")
        .notNull(),
    category: text("category").notNull(),
    tags: text("tags").notNull(),
    isAvailable: integer("is_available")
        .notNull().default(1),
    isCustomisable: integer("customisable").notNull().default(1),
});