import Router from "express";
import { BookingController } from "./booking.controller";

export const bookingRouter = Router();
const bookingController = new BookingController();
bookingRouter.post("/book", bookingController.addBooking);
