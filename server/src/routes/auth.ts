import express from "express"
import { forgotPasswordController, loginController, logoutController, registerController } from "../controllers/auth.controller"
import { checkLoggedIn, passportAuth } from "../middlewares/checkAuthentication"

const authRouter = express.Router()

authRouter.post("/login", checkLoggedIn,passportAuth, loginController)

authRouter.post("/logout", logoutController)

authRouter.post("/register", checkLoggedIn, registerController)

authRouter.post("/forgot-password", checkLoggedIn, forgotPasswordController)

export default authRouter
