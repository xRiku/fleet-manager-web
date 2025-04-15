"use server-only";

import { db } from "@/db";
import { branches } from "@/db/schema";

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

export const getUsers = async () => {
  return await db.query.users.findMany();
};
