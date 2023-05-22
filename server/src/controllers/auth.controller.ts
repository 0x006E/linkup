import { unauthorized } from "@hapi/boom"
import { Request, Response } from "express"
import passport from "passport"
import { z } from "zod"
import { zParse } from "../helpers/zParse"
import { User, UserZodSchema } from "../models/user"

export const loginController = (req: Request, res: Response) =>
  passport.authenticate("local")(req, res, () => {
    req.log.info("Login successful")
    return res.status(200).json({ message: "Login successful" })
  })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logoutController = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return unauthorized("You are not logged in")
  }
  return req.logout((e) => req.log.error(e))
}

export const registerController = async (req: Request, res: Response) => {
  const registerSchema = z.object({
    body: UserZodSchema.pick({ name: true, email: true, password: true })
  })
  const { body } = await zParse(registerSchema, req)
  const { name, email, password } = body
  req.log.debug("Successfully parsed request body")
  await User.register({ name, email }, password)
  req.log.debug("Successfully registered user")
  return res.status(201).json({ message: "User created" })
}
