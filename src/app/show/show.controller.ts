import { Request, Response } from "express";
import { showPayload } from "./show.model";
import { ApiError } from "../../utils/api.error";
import { checkScreenId } from "../screen/screen.service";
import { checkMovieId } from "../movie/movie.service";
import { addShowDetails } from "./show.service";
import { ApiResponse } from "../../utils/api.response";
export class ShowController {
  async addShow(req: Request, res: Response) {
    const validationResult = await showPayload.safeParseAsync(req.body);
    if (!validationResult.success)
      throw new ApiError(
        400,
        "validation failed",
        validationResult.error.issues,
      );
    const { movieId, screenId, showDate, startTime, endTime } =
      validationResult.data;
    const existScreenId = await checkScreenId(screenId);
    const existMovieId = await checkMovieId(movieId);
    if (!existScreenId || !existMovieId) {
      throw new ApiError(400, "screenId and MovieId is null");
    }
    const result = await addShowDetails({
      movieId,
      screenId,
      showDate,
      startTime,
      endTime,
    });
    return new ApiResponse(200, "added show successfully").created(res);
  }
}
