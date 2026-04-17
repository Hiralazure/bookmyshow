import Router from "express";
import { ShowController } from "./show.controller";

export const showRouter = Router();
const showController = new ShowController();
showRouter.post("/add", showController.addShow);
