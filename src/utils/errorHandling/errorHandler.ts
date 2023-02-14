import { NextFunction, Request, Response } from "express";
import { BaseError } from "./ErrorResponse";

class ErrorHandler {
  handleRequest(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BaseError) {
      const statusCode = err.httpCode || 500;
      return res.status(statusCode).send({ status: "error", message: err.message, description: err.description });
    }
    next();
  }
}

export const errorHandler = new ErrorHandler();
