import { Request, Response, NextFunction } from "express";
import { screenPayload } from "./screen.model";
import { ApiError } from "../../utils/api.error";
import { insertScreen } from "./screen.service";
import { ApiResponse } from "../../utils/api.response";
export class ScreenController {
  async addScreen(req: Request, res: Response, next: NextFunction) {
    try {
      const validateResult = await screenPayload.safeParseAsync(req.body);
      if (!validateResult.success) throw new ApiError(400, "screen bad request", validateResult.error.issues);
      const { title, totalSeats } = validateResult.data;
      const result = await insertScreen({ title, totalSeats });
      return new ApiResponse(201, "screen added successfully", result).created(res);
    } catch (err) {
      next(err);
    }
  }
}
