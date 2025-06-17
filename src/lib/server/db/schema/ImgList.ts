import { integer, primaryKey, sqliteTable, text, } from "drizzle-orm/sqlite-core";
export const item = sqliteTable("items", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    ImgPath: text("img_path").notNull(),

});