import { branches, trips, users, vehicles } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";
import { Availability, Role } from "@/types";

if (!process.env.DB_FILE_NAME) {
  throw new Error("Environment variable DB_FILE_NAME is not defined.");
}
const client = createClient({ url: process.env.DB_FILE_NAME });
const db = drizzle({ client });

async function seed() {
  console.log("🌱 Seeding database...");

  await db.insert(branches).values([
    { id: uuidv4(), name: "Caetité" },
    { id: uuidv4(), name: "Guanambi" },
  ]);

  const insertedBranches = await db.select().from(branches).all();

  await db.insert(vehicles).values({
    id: uuidv4(),
    model: "Fusca",
    brand: "Volkswagen",
    color: "Preto",
    plate: "ABC1D23",
    year: 1980,
    odometer: 123456,
    branchId: insertedBranches[0].id, // Assign to the first branch
    availability: Availability.AVAILABLE,
  });

  await db.insert(vehicles).values({
    id: uuidv4(),
    model: "Civic",
    brand: "Honda",
    color: "Branco",
    plate: "DEF4G56",
    year: 2020,
    odometer: 654321,
    branchId: insertedBranches[1].id, // Assign to the second branch
    availability: Availability.AVAILABLE,
  });

  await db.insert(vehicles).values({
    id: uuidv4(),
    model: "Fusca",
    brand: "Volkswagen",
    color: "Vermelho",
    plate: "GHI7J89",
    year: 1980,
    odometer: 987654,
    branchId: insertedBranches[0].id, // Assign to the first branch
    availability: Availability.AVAILABLE,
  });

  await db.insert(users).values({
    id: uuidv4(),
    name: "Philipe Marques",
    documentNumber: "00000000000",
    role: Role.ADMIN,
  });

  await db.insert(users).values({
    id: uuidv4(),
    name: "João Marques",
    documentNumber: "00000000010",
    role: Role.USER,
  });

  const insertedVehicles = await db.select().from(vehicles);

  const insertedUsers = await db.select().from(users);

  await db.insert(trips).values({
    id: uuidv4(),
    vehicleId: insertedVehicles[0].id,
    originId: insertedBranches[1].id,
    destinyId: insertedBranches[0].id,
    driverId: insertedUsers[0].id,
  });

  console.log("✅ Done seeding.");
}

seed()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(() => {
    client.close(); // ✅ Close connection
    console.log("🔌 DB connection closed.");
  });
