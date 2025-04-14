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
