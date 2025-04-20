import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }), 
  plugins: [
    nextCookies(),
  ],
  emailAndPassword: {    
    enabled: true,
    async authorize ({ email, password }: { email: string; password: string }) {
      const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return user;
    }
  },
  session: {
    fields: {
        expiresAt: "expires",
        token: "sessionToken"
    }
  },
  account: {
    fields: {
      accountId: "providerAccountId",
      refreshToken: "refresh_token",
      accessToken: "access_token",
      accessTokenExpiresAt: "access_token_expires",
      idToken: "id_token",
    }
  },
});