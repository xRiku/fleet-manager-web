import { relations } from "drizzle-orm";
import {
  text,
  integer,
  timestamp,
  pgTable,
  boolean,
} from "drizzle-orm/pg-core";
import { Status } from "@/types";

export const garages = pgTable("garages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const vehicles = pgTable("vehicles", {
  id: text("id").primaryKey(),

  plate: text("plate").notNull().unique(),
  color: text("color").notNull(),
  year: integer("year").notNull(),
  model: text("model").notNull(),
  brand: text("brand").notNull(),
  odometer: integer("odometer").notNull(),
  availability: text("availability").notNull(),

  garageId: text("garage_id").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const trips = pgTable("trips", {
  id: text("id").primaryKey(),
  status: text("status").notNull().default(Status.IN_ANALYSIS),
  progress: text("progress"),

  driverId: text("driver_id").notNull(),
  originId: text("origin_id").notNull(),
  destinyId: text("destiny_id").notNull(),
  vehicleId: text("vehicle_id").notNull(),

  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: text("reviewed_by"),
  finishedAt: timestamp("finished_at"),

  // oilLevel: text("oil_level").notNull().default(GenericAnswer.NOT_CHECKED),
  // waterLevel: text("water_level").notNull().default(GenericAnswer.NOT_CHECKED),
  // tiresStatus: text("tires_status")
  //   .notNull()
  //   .default(GenericAnswer.NOT_CHECKED),
  // spareTire: text("spare_tire").notNull().default(GenericAnswer.NOT_CHECKED),
  // headlights: text("headlights").notNull().default(GenericAnswer.NOT_CHECKED),

  // odometerWhenRequesting: integer("odometer_when_requesting").notNull(),
  // notesWhenRequesting: text("notes_when_requesting"),

  odometerWhenFinishing: integer("odometer_when_finishing"),
  notesWhenFinishing: text("notes_when_finishing"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),
  documentNumber: text("document_number").notNull().unique(),
  role: text("role").notNull(),
  email: text("email").notNull(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const garagesRelations = relations(garages, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const usersRelations = relations(users, ({ many }) => ({
  trips: many(trips),
}));

export const tripsRelations = relations(trips, ({ one }) => ({
  origin: one(garages, {
    fields: [trips.originId],
    references: [garages.id],
  }),

  destiny: one(garages, {
    fields: [trips.destinyId],
    references: [garages.id],
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
  garage: one(garages, {
    fields: [vehicles.garageId],
    references: [garages.id],
  }),
  trips: many(trips),
}));

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// Select (read) types
export type Garage = typeof garages.$inferSelect;
export type Vehicle = typeof vehicles.$inferSelect;
export type Trip = typeof trips.$inferSelect;
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type Verification = typeof verifications.$inferSelect;

// Insert (create) types
export type NewGarage = typeof garages.$inferInsert;
export type NewVehicle = typeof vehicles.$inferInsert;
export type NewTrip = typeof trips.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewSession = typeof sessions.$inferInsert;
export type NewAccount = typeof accounts.$inferInsert;
export type NewVerification = typeof verifications.$inferInsert;

export type TripWithRelations = Trip & {
  origin?: typeof garages.$inferSelect;
  destiny?: typeof garages.$inferSelect;
  vehicle?: typeof vehicles.$inferSelect;
  driver?: typeof users.$inferSelect;
};
