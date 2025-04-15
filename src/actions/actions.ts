"use server";

import { db } from "@/db";
import { branches, trips, vehicles } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Status, Trip, Vehicle } from "@/types";

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

export async function createVehicleRequest(data: Omit<Trip, "id">) {
  const onGoingRequestWithVehicleExists = await db
    .select()
    .from(trips)
    .where(
      eq(trips.vehicleId, data.vehicle.id) &&
        eq(trips.status, Status.IN_ANALYSIS)
    );

  if (onGoingRequestWithVehicleExists.length) {
    throw Error("Ongoing request with the same vehicle already exists.");
  }
}
