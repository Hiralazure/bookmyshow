import {z} from "zod";

export const seatPayload = z.object({
  seatType: z.string().nonoptional(),
  seatNumber: z.number(),
  screenId: z.number().optional().nullable()
});
