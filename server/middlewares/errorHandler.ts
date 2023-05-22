import { isBoom } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.log.error("An error occured", err);

  if (isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
  return res.status(400).json({ message: err?.message });
}
