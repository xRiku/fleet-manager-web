"use server";

import { db } from "@/db";
import { branches, trips, users, vehicles } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Availability, Progress, Status, Vehicle } from "@/types";

export async function createUser(data: {
  name: string;
  documentNumber: string;
  role: string;
}) {
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.documentNumber, data.documentNumber));

  if (userExists.length) {
    throw Error("User with the same document number already exists.");
  }

  await db.insert(users).values({
    id: uuidv4(),
    ...data,
  });

  revalidatePath("/users", "page");
}

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
  data: Omit<Vehicle, "id" | "branch" | "availability"> & { branchId: string }
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
    availability: Availability.AVAILABLE,
  });

  revalidatePath("/vehicles", "page");
}

export async function createVehicleRequest(data: {
  vehicleId: string;
  originId: string;
  destinyId: string;
}) {
  // Please remove me after login is done
  const randomDriverId = await db.select().from(users);

  await db.insert(trips).values({
    id: uuidv4(),
    ...data,
    driverId: randomDriverId[0].id,
  });

  revalidatePath("/", "page");
}

export async function approveRequest(tripId: string) {
  const trip = await db.query.trips.findFirst({
    where: eq(trips.id, tripId),
  });

  if (!trip) {
    throw Error("Invalid tripId");
  }

  // remove after login
  const user = await db.query.users.findFirst({
    where: eq(users.name, "Philipe Marques"),
  });

  await db
    .update(trips)
    .set({
      reviewedAt: new Date().toISOString(),
      reviewedBy: user?.id,
      status: Status.APPROVED,
      progress: Progress.IN_PROGRESS,
    })
    .where(eq(trips.id, trip.id));

  await db
    .update(vehicles)
    .set({
      availability: Availability.UNAVAILABLE,
    })
    .where(eq(vehicles.id, trip.vehicleId));

  revalidatePath("/trips", "page");
}

export async function rejectRequest(tripId: string) {
  const trip = await db.query.trips.findFirst({
    where: eq(trips.id, tripId),
  });

  if (!trip) {
    throw Error("Invalid tripId");
  }

  // remove after login
  const user = await db.query.users.findFirst({
    where: eq(users.name, "Philipe Marques"),
  });

  await db
    .update(trips)
    .set({
      reviewedAt: new Date().toISOString(),
      reviewedBy: user?.id,
      status: Status.REJECTED,
    })
    .where(eq(trips.id, trip.id));

  revalidatePath("/trips", "page");
}

export async function finishTrip() {
  // remove asap when login is ready
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, "Philipe Marques"),
  });

  if (!user?.id) {
    throw new Error("User ID is undefined.");
  }

  await db.transaction(async (tx) => {
    const [trip] = await tx
      .update(trips)
      .set({
        finishedAt: new Date().toISOString(),
        progress: Progress.DONE,
      })
      .where(
        and(
          eq(trips.driverId, user.id),
          eq(trips.progress, Progress.IN_PROGRESS)
        )
      )
      .returning({
        vehicleId: trips.vehicleId,
        destinyId: trips.destinyId,
      });

    if (!trip) {
      throw new Error("Trip does not exist or wasn't in progress.");
    }

    await tx
      .update(vehicles)
      .set({
        availability: Availability.AVAILABLE,
        branchId: trip.destinyId,
      })
      .where(eq(vehicles.id, trip.vehicleId));
  });

  revalidatePath("/trips", "page");
}
