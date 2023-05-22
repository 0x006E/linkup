import { Request, Response } from "express"
import { User } from "../models/user"

export const getUserDetails = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id)
  if (!user) {
    req.log.error("User not found, logging out")
    req.logout((e) => req.log.error(e))
    return res.status(404).json({ message: "User not found" })
  }
  req.log.info("User found")
  res.status(200).json(req.user)
  return res.status(200).json(user)
}
