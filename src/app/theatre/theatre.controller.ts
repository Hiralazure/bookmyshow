import { Request, Response } from "express";
export class TheatreController {
  async handleAddTheatreDetails(req: Request, res: Response) {
    return res.status(200).json({ message: " add theatre" });
  }
  async handleGetTheatreDetails(req: Request, res: Response) {
    return res.status(200).json({ message: " Get theatre" });
  }
}
