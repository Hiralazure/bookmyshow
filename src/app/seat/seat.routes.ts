import Router from "express";
import { SeatController } from "./seat.controller";

export const seatRouter = Router();

const seatController = new SeatController();

seatRouter.post("/add", seatController.addSeats);
