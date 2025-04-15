"use server-only";

import { db } from "@/db";
import { branches, trips, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getBranches = async () => {
  return await db.select().from(branches);
};

export const getVehicles = async () => {
  return await db.query.vehicles.findMany({
    with: {
      branch: true,
    },
  });
};

export const getVehiclesForBranch = async (branchId: string) => {
  return await db.query.vehicles.findMany({
    with: {
      branch: true,
    },
    where: (vehicle, { eq }) => eq(vehicle.branchId, branchId),
  });
};

export const getTrips = async () => {
  return await db.query.trips.findMany({
    with: {
      origin: true,
      destiny: true,
      vehicle: true,
      driver: true,
    },
  });
};

export const getVehicleRequestsForUser = async () => {
  // Remove after login
  const user = await db.select().from(users);

  return await db.query.trips.findMany({
    where: eq(trips.driverId, user[0].id),
    with: {
      vehicle: true,
      origin: true,
      destiny: true,
    },
  });
};

export const getUsers = async () => {
  return await db.query.users.findMany();
};
