import { relations } from "drizzle-orm";
import { text, int, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { Status } from "@/types";

export const branches = sqliteTable("branches", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const vehicles = sqliteTable("vehicles", {
  id: text("id").primaryKey(),

  plate: text("plate").notNull().unique(),
  color: text("color").notNull(),
  year: int().notNull(),
  model: text("model").notNull(),
  brand: text("brand").notNull(),
  odometer: int().notNull(),
  availability: text("availability").notNull(),

  branchId: text("branch_id").notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const trips = sqliteTable("trips", {
  id: text("id").primaryKey(),
  status: text("status").notNull().default(Status.IN_ANALYSIS),
  progress: text("progress"),

  driverId: text("driver_id").notNull(),
  originId: text("origin_id").notNull(),
  destinyId: text("destiny_id").notNull(),
  vehicleId: text("vehicle_id").notNull(),

  reviewedAt: text("reviewed_at"),
  reviewedBy: text("reviewed_by"),
  finishedAt: text("finished_at"),

  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),
  documentNumber: text("document_number").notNull().unique(),
  role: text("role").notNull(),
  email: text("email").notNull(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull(),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const branchesRelations = relations(branches, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const usersRelations = relations(users, ({ many }) => ({
  trips: many(trips),
}));

export const tripsRelations = relations(trips, ({ one }) => ({
  origin: one(branches, {
    fields: [trips.originId],
    references: [branches.id],
  }),

  destiny: one(branches, {
    fields: [trips.destinyId],
    references: [branches.id],
  }),

  vehicle: one(vehicles, {
    fields: [trips.vehicleId],
    references: [vehicles.id],
  }),

  driver: one(users, {
    fields: [trips.driverId],
    references: [users.id],
  }),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  branch: one(branches, {
    fields: [vehicles.branchId],
    references: [branches.id],
  }),
  trips: many(trips),
}));


export const sessions = sqliteTable("sessions", {
  id: text('id').primaryKey(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
token: text('token').notNull().unique(),
createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
ipAddress: text('ip_address'),
userAgent: text('user_agent'),
userId: text('user_id').notNull().references(()=> users.id, { onDelete: 'cascade' })
});

export const accounts = sqliteTable("accounts", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(()=> users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const verifications = sqliteTable("verifications", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});
