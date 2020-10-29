import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
