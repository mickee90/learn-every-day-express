import { Request, Response, NextFunction } from "express";

module.exports = (error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: error.message,
    data: error.data,
    stack:
      process.env.NODE_ENV === "production" ? "No stack here" : error.stack,
  });
};
