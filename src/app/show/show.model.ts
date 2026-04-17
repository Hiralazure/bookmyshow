import { z } from "zod";

export const showPayload = z.object({
  movieId: z.number(),
  screenId: z.number(),
  showDate: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/,
      "Invalid date format (dd-mm-yyyy)",
    ),
  startTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
      "Invalid time format (HH:MM or HH:MM:SS)",
    ),
  endTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
      "Invalid time format (HH:MM or HH:MM:SS)",
    ),
});
