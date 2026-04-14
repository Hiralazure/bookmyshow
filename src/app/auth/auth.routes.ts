import Router from "express";
import { AuthController } from "./auth.controller";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post("/signup", authController.handleSignup);
authRouter.post("/signin", authController.handleSignin);
