import { Response } from "express";

export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(
    private statusCode: number,
    message: string,
    data?: T,
  ) {
    this.success = true;
    this.message = message;
    this.data = data;
  }

  created(res: Response) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
  list(res: Response) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}
