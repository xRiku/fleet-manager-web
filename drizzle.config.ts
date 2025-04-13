import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DB_FILE_NAME!,
  },
});
