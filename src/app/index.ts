import express from "express";
import { errorHandler } from "../middleware/error.middleware";
import { authRouter } from "./auth/auth.routes";
export async function createApplication() {
  const app = express();
  app.use(express.json());
  app.use("/auth", authRouter);

  app.use(errorHandler);
  return app;
}
