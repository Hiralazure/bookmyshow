import express from "express";
import { errorHandler } from "../middleware/error.middleware";
import { authRouter } from "./auth/auth.routes";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import { movieRouter } from "./movie/movie.routes";
import { screenRouter } from "./screen/screen.routes";
import { seatRouter } from "./seat/seat.routes";
export async function createApplication() {
  const app = express();
  app.use(express.json());
  app.use(authenticationMiddleware());
  app.use("/auth", authRouter);
  app.use("/movies", movieRouter);
  app.use("/screens", screenRouter);
  app.use("/seats", seatRouter);

  app.use(errorHandler);
  return app;
}
