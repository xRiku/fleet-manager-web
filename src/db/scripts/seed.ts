// import { garages, trips, users, vehicles, accounts } from "@/db/schema";
// import { v4 as uuidv4 } from "uuid";
// import { drizzle } from "drizzle-orm/better-sqlite3";
// import "dotenv/config";
// import { Availability, Role } from "@/types";
// import bcrypt from "bcryptjs";
// import Database from "better-sqlite3";
// import { env } from "@/env";
// import * as schema from "@/db/schema";

// if (!process.env.DB_FILE_NAME) {
//   throw new Error("Environment variable DB_FILE_NAME is not defined.");
// }
// const sqlite = Database(env.DB_FILE_NAME);
// const db = drizzle({ client: sqlite, schema });

// async function seed() {
//   console.log("🌱 Seeding database...");

//   await db.insert(garages).values([
//     { id: uuidv4(), name: "Caetité" },
//     { id: uuidv4(), name: "Guanambi" },
//   ]);

//   const userId = uuidv4();
//   const adminId = uuidv4();
//   const hashedAdminPassword = await bcrypt.hash("admin123", 10);
//   const hashedUserPassword = await bcrypt.hash("user123", 10);

//   const insertedGarages = await db.select().from(garages).all();

//   await db.insert(vehicles).values({
//     id: uuidv4(),
//     model: "Fusca",
//     brand: "Volkswagen",
//     color: "Preto",
//     plate: "ABC1D23",
//     year: 1980,
//     odometer: 123456,
//     garageId: insertedGarages[0].id, // Assign to the first garage
//     availability: Availability.AVAILABLE,
//   });

//   await db.insert(vehicles).values({
//     id: uuidv4(),
//     model: "Civic",
//     brand: "Honda",
//     color: "Branco",
//     plate: "DEF4G56",
//     year: 2020,
//     odometer: 654321,
//     garageId: insertedGarages[1].id, // Assign to the second garage
//     availability: Availability.AVAILABLE,
//   });

//   await db.insert(vehicles).values({
//     id: uuidv4(),
//     model: "Fusca",
//     brand: "Volkswagen",
//     color: "Vermelho",
//     plate: "GHI7J89",
//     year: 1980,
//     odometer: 987654,
//     garageId: insertedGarages[0].id, // Assign to the first garage
//     availability: Availability.AVAILABLE,
//   });

//   await db.insert(users).values({
//     id: adminId,
//     name: "Philipe Marques",
//     documentNumber: "00000000000",
//     email: "philipe@gmail.com",
//     emailVerified: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     role: Role.ADMIN,
//   });

//   await db.insert(users).values({
//     id: userId,
//     name: "João Marques",
//     documentNumber: "00000000010",
//     email: "joao@gmail.com",
//     emailVerified: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     role: Role.USER,
//   });

//   const insertedVehicles = await db.select().from(vehicles);

//   const insertedUsers = await db.select().from(users);

//   await db.insert(trips).values({
//     id: uuidv4(),
//     vehicleId: insertedVehicles[0].id,
//     originId: insertedGarages[1].id,
//     destinyId: insertedGarages[0].id,
//     driverId: insertedUsers[0].id,
//   });

//   await db.insert(accounts).values({
//     id: uuidv4(),
//     userId: userId,
//     accountId: "joao@gmail.com",
//     providerId: "credentials",
//     password: hashedUserPassword,
//     accessToken: null,
//     accessTokenExpiresAt: null,
//     refreshToken: null,
//     refreshTokenExpiresAt: null,
//     idToken: null,
//     scope: null,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });
//   await db.insert(accounts).values({
//     id: uuidv4(),
//     userId: adminId,
//     accountId: "philipe@gmail.com", // geralmente o email, depende do seu authorize()
//     providerId: "credentials",
//     password: hashedAdminPassword,
//     accessToken: null,
//     accessTokenExpiresAt: null,
//     refreshToken: null,
//     refreshTokenExpiresAt: null,
//     idToken: null,
//     scope: null,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });

//   console.log("✅ Done seeding.");
// }

// seed()
//   .catch((err) => {
//     console.error("❌ Seed failed:", err);
//     process.exit(1);
//   })
//   .finally(() => {
//     sqlite.close(); // ✅ Close connection
//     console.log("🔌 DB connection closed.");
//   });
