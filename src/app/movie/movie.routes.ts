import { Router } from "express";
import { MovieController } from "./movie.controller";

export const movieRouter = Router();
const movieController = new MovieController();
movieRouter.post("/add", movieController.handleAddMovie);
movieRouter.post("/update", movieController.handleUpdateMovie);
movieRouter.post("/", movieController.handleGetMovie);
movieRouter.post("/delete", movieController.handleDeleteMovie);