import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(100),
})
export type AuthSchema = z.infer<typeof authSchema>;
