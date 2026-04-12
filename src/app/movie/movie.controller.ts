import { Request, Response } from "express";
export class MovieController {
  async handleAddMovie(req: Request, res: Response) {
    return res.status(200).json({ message: "add movie" });
  }
  async handleUpdateMovie(req: Request, res: Response) {
    return res.status(200).json({ message: "update movie" });
  }
  async handleGetMovie(req: Request, res: Response) {
    return res.status(200).json({ message: "get movie" });
  }
  async handleDeleteMovie(req: Request, res: Response) {
    return res.status(200).json({ message: "Delete movie" });
  }
}
