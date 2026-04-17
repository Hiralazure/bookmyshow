import { Request, Response, NextFunction } from "express";
import { bookingPayload } from "./booking.model";
import { ApiError } from "../../utils/api.error";
import { createBooking } from "./booking.service";
import { ApiResponse } from "../../utils/api.response";

export class BookingController {
  async addBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = await bookingPayload.safeParseAsync(req.body);
      if (!validationResult.success)
        throw new ApiError(
          400,
          "cannot do booking",
          validationResult.error.issues,
        );

      const { movieId, showId, userId, seatIds } = validationResult.data;
      //check movieId,userId,showId exist
      await createBooking({ movieId, showId, userId, seatIds });
      return new ApiResponse(201, "booking successful").created(res);
    } catch (error) {
      next(error);
    }
  }
}
