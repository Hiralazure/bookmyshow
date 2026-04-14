import express from "express";
import { errorHandler } from "../middleware/error.middleware";
import { authRouter } from "./auth/auth.routes";
import { authenticationMiddleware } from "../middleware/auth.middleware";
export async function createApplication() {
  const app = express();
  app.use(express.json());
  console.log("herwrwe");
  app.use(authenticationMiddleware());
  app.use("/auth", authRouter);

  app.use(errorHandler);
  return app;
}
