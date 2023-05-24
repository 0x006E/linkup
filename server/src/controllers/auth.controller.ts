import { unauthorized } from "@hapi/boom"
import { Request, Response } from "express"
import { z } from "zod"
import { zParse } from "../helpers/zParse"
import { User, UserZodSchema } from "../models/user"

export const loginController = (req: Request, res: Response) => {
  /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Authentication using email and password',
                schema: {
                    $email: 'john@example.com',
                    $password: 'password',
                }
        } */
        
  req.log.info("Login successful")
  return res.status(200).json({ message: "Login successful" })
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logoutController = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    throw unauthorized("You are not logged in")
  }
  req.logout((e) => req.log.error(e))
  return res.status(200).json({ message: "Logout successful" })
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

export const forgotPasswordController = async (req: Request, res: Response) => {
  const forgotPasswordSchema = z.object({
    body: UserZodSchema.pick({ email: true, password: true })
  })
  const { body } = await zParse(forgotPasswordSchema, req)
  const { email, password } = body;
  const user = await User.findOne({ email })
  if (!user) {
    throw unauthorized("User not found")
  }
  await user.setPassword(password)
  return res.status(200).json({ message: "Password updated" })
}
