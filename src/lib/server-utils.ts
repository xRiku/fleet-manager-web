"use server-only";

import { db } from "@/db";
import { branches, trips } from "@/db/schema";
import { Availability, Progress } from "@/types";
import { eq } from "drizzle-orm";
import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    where: (vehicle, { eq, and }) =>
      and(
        eq(vehicle.branchId, branchId),
        eq(vehicle.availability, Availability.AVAILABLE)
      ),
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
    orderBy: (trips, { desc }) => [desc(trips.createdAt)],
  });
};

export const getVehicleRequestsForDriver = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const driver = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id),
  });

  if (!driver) {
    throw Error("Driver not found.");
  }

  return await db.query.trips.findMany({
    where: eq(trips.driverId, driver.id),
    with: {
      vehicle: true,
      origin: true,
      destiny: true,
    },
    orderBy: (trips, { desc }) => [desc(trips.createdAt)],
  });
};

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getCurrentTripForDriver = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const driver = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id),
  });

  if (!driver) {
    return;
  }

  return await db.query.trips.findFirst({
    with: {
      destiny: true,
      vehicle: true,
      origin: true,
    },
    where: (trips, { eq, and }) =>
      and(
        eq(trips.driverId, driver.id),
        eq(trips.progress, Progress.IN_PROGRESS)
      ),
  });
};

export const getTripById = async (tripId: string) => {
  const trip = await db.query.trips.findFirst({
    where: (trips, { eq }) => eq(trips.id, tripId),
    with: {
      destiny: true,
      vehicle: true,
      origin: true,
      driver: true,
    },
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  return trip;
};
