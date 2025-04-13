import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const branches = sqliteTable("branches", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});
