import { relations } from "drizzle-orm";
import { text, int, sqliteTable } from "drizzle-orm/sqlite-core";

export const branches = sqliteTable("branches", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const branchesRelations = relations(branches, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const vehicles = sqliteTable("vehicles", {
  id: text("id").primaryKey(),

  plate: text("plate").notNull(),
  color: text("color").notNull(),
  year: int().notNull(),
  model: text("model").notNull(),
  brand: text("brand").notNull(),
  odometer: int().notNull(),
  isAvailable: int().notNull(),

  branchId: text("branch_id").notNull(),
});

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  branch: one(branches, {
    fields: [vehicles.branchId],
    references: [branches.id],
  }),
}));
