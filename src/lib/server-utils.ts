"use server-only";

import { db } from "@/db";
import { branches } from "@/db/schema";

export const getBranches = async () => {
  return await db.select().from(branches);
};
