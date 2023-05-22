import { Request, Response } from "express"
import { User } from "../models/user"
import { notFound } from "@hapi/boom"

export const getUserDetails = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id)
  if (!user) {
    req.log.error("User not found, logging out")
    req.logout((e) => req.log.error(e))
    return notFound("User not found")
  }
  req.log.info("User found")
  return res.status(200).json(req.user)
}
