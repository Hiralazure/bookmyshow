import { z } from "zod";

export const bookingPayload = z.object({
  movieId: z.coerce.number(),
  showId: z.coerce.number(),
  userId: z.coerce.number(),
  bookingStatus: z.string().default("pending"),
  seatIds: z.array(z.coerce.number()),
});
