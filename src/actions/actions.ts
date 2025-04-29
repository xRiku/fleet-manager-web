"use server";

import { db } from "@/db";
import { garages, trips, vehicles } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Availability, Progress, Status, Vehicle } from "@/types";
import { auth } from "@/lib/auth";
import { AuthSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CompleteTripSchema } from "@/components/complete-trip-confirmation-form";
import { RequestVehicleSchema } from "@/components/request-vehicle-form";

export async function createUser({
  name,
  documentNumber,
  role,
  email,
  password,
}: {
  name: string;
  documentNumber: string;
  role: string;
  email: string;
  password: string;
}) {
  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      documentNumber,
      role,
    },
  });

  revalidatePath("/users", "page");
}

export async function createGarage(name: string) {
  const cityExists = await db
    .select()
    .from(garages)
    .where(eq(garages.name, name));

  if (cityExists.length) {
    throw Error("City already exists.");
  }

  await db.insert(garages).values({
    id: uuidv4(),
    name,
  });

  revalidatePath("/garages", "page");
}

export async function createVehicle(
  data: Omit<Vehicle, "id" | "garage" | "availability"> & { garageId: string }
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

export async function createVehicleRequest(data: RequestVehicleSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const driverId = session.user.id;

  await db.insert(trips).values({
    id: uuidv4(),
    ...data,
    driverId,
    status: Status.IN_ANALYSIS,
    odometerWhenRequesting: data.odometer,
    notesWhenRequesting: data.notes,
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

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;

  await db.transaction(async (tsx) => {
    await tsx
      .update(trips)
      .set({
        reviewedAt: new Date(),
        reviewedBy: userId,
        status: Status.APPROVED,
        progress: Progress.IN_PROGRESS,
      })
      .where(eq(trips.id, trip.id));

    await tsx
      .update(vehicles)
      .set({
        availability: Availability.UNAVAILABLE,
      })
      .where(eq(vehicles.id, trip.vehicleId));

    await tsx
      .update(trips)
      .set({
        reviewedAt: new Date(),
        reviewedBy: userId,
        status: Status.REJECTED,
      })
      .where(
        and(
          eq(trips.vehicleId, trip.vehicleId),
          eq(trips.status, Status.IN_ANALYSIS)
        )
      );
  });

  revalidatePath("/trips", "page");
}

export async function rejectRequest(tripId: string) {
  const trip = await db.query.trips.findFirst({
    where: eq(trips.id, tripId),
  });

  if (!trip) {
    throw Error("Invalid tripId");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;

  await db
    .update(trips)
    .set({
      reviewedAt: new Date(),
      reviewedBy: userId,
      status: Status.REJECTED,
    })
    .where(eq(trips.id, trip.id));

  revalidatePath("/trips", "page");
}

export async function finishTrip(data: CompleteTripSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;

  if (!userId) {
    throw new Error("User ID is undefined.");
  }

  await db.transaction(async (tx) => {
    const [trip] = await tx
      .update(trips)
      .set({
        finishedAt: new Date(),
        progress: Progress.DONE,
        odometerWhenFinishing: data.odometer,
        notesWhenFinishing: data.notes,
      })
      .where(
        and(
          eq(trips.driverId, userId),
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
        garageId: trip.destinyId,
        odometer: data.odometer,
      })
      .where(eq(vehicles.id, trip.vehicleId));
  });

  revalidatePath("/trips", "page");
}

export async function logIn(data: AuthSchema) {
  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
