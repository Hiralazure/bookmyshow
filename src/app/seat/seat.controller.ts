import { Request, Response, NextFunction } from "express";
import { seatPayload } from "./seat.model";
import { ApiError } from "../../utils/api.error";
import { checkScreenId } from "../screen/screen.service";
import { addSeat } from "./seat.service";
import { ApiResponse } from "../../utils/api.response";
export class SeatController {
  async addSeats(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = await seatPayload.safeParseAsync(req.body);
      if (validationResult.error) throw new ApiError(400, "bad request1");
      console.log("hererwrew11");
      const { seatType, seatNumber, screenId } = validationResult.data;
      console.log("hererwrew2");
      if (screenId !== undefined && screenId !== null) {
        const screenIdExist = await checkScreenId(screenId);
        if (screenIdExist.length === 0)
          throw new ApiError(400, "ScreenID does not exist");
      }
      const result = await addSeat({ seatType, seatNumber, screenId: screenId ?? undefined });
      return new ApiResponse(201, "added succesfulyy", result).created(res);
    } catch (err) {
      next(err);
    }
  }
}
