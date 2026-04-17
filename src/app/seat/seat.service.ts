import { db } from "../../db";
import { seatTables } from "../../db/schema";

interface Seat {
  seatType: string;
  seatNumber: number;
  screenId?: number | null;
}

export async function addSeat(seatDetails: Seat) {
  try {
    return await db.insert(seatTables).values({
      seatType: seatDetails.seatType,
      seatNumber: seatDetails.seatNumber,
      screenId: seatDetails.screenId ?? null,
    });
  } catch (err) {
    throw err;
  }
}
