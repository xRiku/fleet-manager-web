
import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: env.BASE_URL! // Optional if the API base URL matches the frontend
});
 
export const { signIn, signOut, useSession } = authClient;
