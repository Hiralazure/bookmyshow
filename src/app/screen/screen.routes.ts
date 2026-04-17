import { Router } from "express";
import { ScreenController } from "./screen.controller";
export const screenRouter = Router();
const screenController = new ScreenController();

screenRouter.post("/add", screenController.addScreen);
