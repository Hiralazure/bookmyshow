import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api.error";
import { tokenPayload, verifyToken } from "../utils/token";
declare global {
  namespace Express {
    interface Request {
      user?: tokenPayload;
    }
  }
}
export function authenticationMiddleware() {
  const paths = ["/auth/signin", "/auth/signup"];

  return function (req: Request, res: Response, next: NextFunction) {
    try {
      if (paths.includes(req.path)) {
        return next();
      }

      const header = req.headers["authorization"];
      if (!header || !header.startsWith("Bearer"))
        throw new ApiError(401, "unauthorized user");
      const token = header.split(" ")[1];
      req.user = verifyToken(token);
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return next(new ApiError(401, "Token expired"));
      }

      return next(new ApiError(401, "Invalid token"));
    }
  };
}
