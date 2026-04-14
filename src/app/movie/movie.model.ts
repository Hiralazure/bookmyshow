import { z } from "zod";

export const moviePayload = z.object({
  title: z.string().nonempty().nonoptional(),
  description: z.string(),
  duration: z.number(),
  isActive: z.boolean().default(true),
});
