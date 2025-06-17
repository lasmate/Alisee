import { integer, primaryKey, sqliteTable, text, } from "drizzle-orm/sqlite-core";
export const ImgList = sqliteTable("img_list", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
    ImgPath: text("img_path").notNull().unique(),

});