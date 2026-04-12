import { Request, Response } from "express";
export class AuthController {
  async handleSignup(req: Request, res: Response) {
    return res.status(200).json({ message: "signup" });
  }

  async handleSignin(req: Request, res: Response) {
    return res.status(200).json({ message: "signin" });
  }
}
