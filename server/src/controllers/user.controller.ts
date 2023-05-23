import { notFound } from "@hapi/boom"
import { Request, Response } from "express"
import { PassportLocalDocument } from "mongoose"
import { z } from "zod"
import { zParse } from "../helpers/zParse"
import { User, UserZodSchema } from "../models/user"

export const getUserDetails = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id)
  if (!user) {
    req.log.error("User not found, logging out")
    req.logout((e) => req.log.error(e))
    throw notFound("User not found")
  }
  req.log.info("User found")
  return res.status(200).json(req.user)
}

export const updateUserDetails = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id)
  if (!user) {
    req.log.error("User not found, logging out")
    req.logout((e) => req.log.error(e))
    throw notFound("User not found")
  }
  const updateUserDetailsSchema = z.object({
    body: UserZodSchema.pick({ name: true, email: true })
  })
  const { body } = await zParse(updateUserDetailsSchema, req)
  const { name, email } = body
  user.name = name
  user.email = email
  await user.save()
  req.log.info("User details updated")
  return res.status(200).json(user)
}

export const updateUserPassword = async (req: Request, res: Response) => {
  const user: PassportLocalDocument | null = await User.findById(req.user?._id)
  if (!user) {
    req.log.error("User not found, logging out")
    req.logout((e) => req.log.error(e))
    throw notFound("User not found")
  }
  const updateUserPasswordSchema = z.object({
    body: z.object({
      currentPassword: z.string(),
      newPassword: z.string()
    })
  })
  const { body } = await zParse(updateUserPasswordSchema, req)
  const { currentPassword, newPassword } = body
  await user.changePassword(currentPassword, newPassword)
  req.log.info("User password updated")
  return res.status(200).json({ message: "Password updated" })
}
