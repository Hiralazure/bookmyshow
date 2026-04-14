import { Router } from "express";
import { MovieController } from "./movie.controller";

export const movieRouter = Router();
const movieController = new MovieController();
movieRouter.post("/add", movieController.handleAddMovie);
movieRouter.get("/", movieController.handleGetMovie);
