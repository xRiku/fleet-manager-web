"use server";

import { db } from "@/db";
import { branches, trips, users, vehicles } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Status, Vehicle } from "@/types";

export async function createBranch(name: string) {
  const cityExists = await db
    .select()
    .from(branches)
    .where(eq(branches.name, name));

  if (cityExists.length) {
    throw Error("City already exists.");
  }

  await db.insert(branches).values({
    id: uuidv4(),
    name,
  });

  revalidatePath("/branches", "page");
}

export async function createVehicle(
  data: Omit<Vehicle, "id" | "branch"> & { branchId: string }
) {
  const vehicleExists = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.plate, data.plate));

  if (vehicleExists.length) {
    throw Error("Vehicle plate is already registered.");
  }

  await db.insert(vehicles).values({
    id: uuidv4(),
    ...data,
  });

  revalidatePath("/vehicles", "page");
}

export async function createVehicleRequest(data: {
  vehicleId: string;
  originId: string;
  destinyId: string;
}) {
  const onGoingRequestWithVehicleExists = await db
    .select()
    .from(trips)
    .where(
      and(
        eq(trips.vehicleId, data.vehicleId),
        eq(trips.status, Status.IN_ANALYSIS)
      )
    );

  if (onGoingRequestWithVehicleExists.length) {
    throw Error("Ongoing request with the same vehicle already exists.");
  }

  // Please remove me after login is done
  const randomDriverId = await db.select().from(users);

  await db.insert(trips).values({
    id: uuidv4(),
    ...data,
    driverId: randomDriverId[0].id,
  });
}
