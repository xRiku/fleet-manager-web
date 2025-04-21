import { db } from "@/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    emailAndPassword: {
      enabled: true
    },
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
        ...schema,
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      }
    }),
    user: {
      additionalFields: {
        documentNumber: {
          type: "string",
          required: true,
          unique: true,
        },
        role: {
          type: "string",
          required: true,
        },
      },
    },
    plugins: [nextCookies()],
});