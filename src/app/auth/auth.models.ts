import { z } from "zod";
export const signupPayload = z.object({
  firstName: z.string(),
  lastName: z.string().nullable(),
  email: z.email(),
  phone: z.string(),
  password: z.string().min(6),
  role: z.string().default("user"),
});

export const signinPayload = z.object({
  email: z.email(),
  password: z.string().min(6),
});
