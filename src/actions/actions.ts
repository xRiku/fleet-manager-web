"use server";

import { db } from "@/db";
import { accounts, branches, trips, users, vehicles } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Availability, Progress, Status, Vehicle } from "@/types";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import bcrypt from "bcryptjs";
import { AuthSchema } from "@/lib/validations";

export async function createUser(data: {
  name: string;
  documentNumber: string;
  role: string;
  email: string;
  password: string;
}) {
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.documentNumber, data.documentNumber));

  if (userExists.length) {
    throw Error("User with the same document number already exists.");
  }

  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await db.insert(users).values({
    hashedPassword: bcrypt.hashSync(data.password, 10),
    id: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: data.email,
    emailVerified: true,
    name: data.name,
    documentNumber: data.documentNumber,
    role: data.role,
    image: null,
  });

  await db.insert(accounts).values({
    id: uuidv4(),
    accountId: data.email,
    providerId: "email",
    userId,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
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

export async function logIn(data: AuthSchema) {
  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password
      },
      asResponse: true // returns a response object instead of data
    })
  }
  catch (error) {
    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
}