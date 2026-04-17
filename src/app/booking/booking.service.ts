import { db } from "../../db";
import {
  bookingDetailTables,
  bookingTables,
  seatTables,
} from "../../db/schema";
import { eq, inArray, and } from "drizzle-orm";
import { ApiError } from "../../utils/api.error";

interface booking {
  movieId: number;
  showId: number;
  userId: number;
  seatIds: number[];
}
export async function createBooking(bookingDetail: booking) {
  return await db.transaction(async (tx) => {
    const seats = await tx
      .select()
      .from(seatTables)
      .where(inArray(seatTables.id, bookingDetail.seatIds));

    if (seats.length !== bookingDetail.seatIds.length) {
      throw new ApiError(400, "One or more selected seats are invalid.");
    }

    const alreadyBooked = await tx
      .select()
      .from(bookingDetailTables)
      .where(
        and(
          inArray(bookingDetailTables.seatId, bookingDetail.seatIds),
          eq(bookingDetailTables.showId, bookingDetail.showId),
        ),
      );

    if (alreadyBooked.length > 0) {
      throw new ApiError(
        400,
        "One or more selected seats are already booked for this show.",
      );
    }

    const [booking] = await tx
      .insert(bookingTables)
      .values({
        movieId: bookingDetail.movieId,
        showId: bookingDetail.showId,
        userId: bookingDetail.userId,
        bookingStatus: "CONFIRMED",
      })
      .returning();

    await tx.insert(bookingDetailTables).values(
      bookingDetail.seatIds.map((seatId) => ({
        bookingId: booking.id,
        seatId,
        showId: bookingDetail.showId,
      })),
    );

    return booking;
  });
}
