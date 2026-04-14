import { Request, Response } from "express";
import { moviePayload } from "./movie.model";
import { ApiError } from "../../utils/api.error";
import { getMovies, insertMovies } from "./movie.service";
import { ApiResponse } from "../../utils/api.response";
export class MovieController {
  async handleAddMovie(req: Request, res: Response) {
    const validationResult = await moviePayload.safeParseAsync(req.body);
    if (!validationResult.success)
      throw new ApiError(
        400,
        "validation failed",
        validationResult.error.issues,
      );
    const result = await insertMovies(validationResult.data);
    return new ApiResponse(201, "movie added successfully", result).created(
      res,
    );
  }

  async handleGetMovie(req: Request, res: Response) {
    const result = await getMovies();
     return new ApiResponse(200, "movie added successfully", result).list(
       res,
     );
  }
  /*async handleUpdateMovie(req: Request, res: Response) {
    return new ApiResponse(200, "movie updated successfully");
  }
  async handleDeleteMovie(req: Request, res: Response) {
    return res.status(200).json({ message: "Delete movie" });
  }*/
}
