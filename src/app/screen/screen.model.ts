import { z } from "zod";

export const screenPayload = z.object({
  title: z.string().nonoptional(),
  totalSeats: z.number(),
});
