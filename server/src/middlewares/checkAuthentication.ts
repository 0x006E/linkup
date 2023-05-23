import { badRequest } from "@hapi/boom"
import { NextFunction, Request, Response } from "express"
import morgan from "morgan"

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next()
  }
  morgan("dev Unauthorized")
  return res.status(401).json({ message: "Unauthorized" })
}

export const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return badRequest("You are already logged in")
  }
  next()
}
