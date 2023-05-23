import express, { Request, Response } from "express"
import passport from "passport"
import { loginController, logoutController, registerController } from "../controllers/auth.controller"
import { checkLoggedIn } from "../middlewares/checkAuthentication"

const authRouter = express.Router()

authRouter.post("/login", checkLoggedIn, passport.authenticate("local"), loginController)

authRouter.post("/logout", logoutController)

authRouter.post("/register", checkLoggedIn, registerController)

authRouter.post("/forgot-password", (req: Request, res: Response) => {
  res.send("forgot-password")
})

export default authRouter
