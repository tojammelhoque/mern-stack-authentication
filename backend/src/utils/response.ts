import { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    data: any = null,
    message: string = "Success",
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message: string = "Error occurred",
    statusCode: number = 500,
    errors: any = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
    });
  }

  static created(
    res: Response,
    data: any,
    message: string = "Created successfully"
  ) {
    return this.success(res, data, message, 201);
  }
}
