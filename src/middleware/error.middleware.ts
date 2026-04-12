import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api.error";
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || null,
  });
};
