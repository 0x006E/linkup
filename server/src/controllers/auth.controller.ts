import { unauthorized } from "@hapi/boom"
import { Request, Response } from "express"
import passport from "passport"
import { z } from "zod"
import { zParse } from "../helpers/zParse"
import { User, UserZodSchema } from "../models/user"

export const loginController = (req: Request, res: Response) =>
  passport.authenticate("local")(req, res, () => {
    res.status(200).json({ message: "Login successful" })
    req.log.info("Login successful")
  })

export const logoutController = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return unauthorized("You are not logged in")
  }
  req.logout((e) => req.log.error(e))
  res.redirect("/")
}

export const registerController = async (req: Request, res: Response) => {
  const registerSchema = z.object({
    body: UserZodSchema.pick({ name: true, email: true, password: true })
  })
  const { body } = await zParse(registerSchema, req)
  const { name, email, password } = body
  req.log.debug("Successfully parsed request body")
  User.register({ name, email }, password)
  req.log.debug("Successfully registered user")
  res.status(201).json({ message: "User created" })
}
