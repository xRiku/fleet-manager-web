import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { env } from "@/env";
import * as schema from "@/db/schema";

const sqlite = Database(env.DB_FILE_NAME);

export const db = drizzle({ client: sqlite, schema });
