import Router from "express";
import { TheatreController } from "./theatre.controller";

const theatreRouter = Router();
const theatreController = new TheatreController();
theatreRouter.post("/add", theatreController.handleAddTheatreDetails);
theatreRouter.post("/get", theatreController.handleGetTheatreDetails);
