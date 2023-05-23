import express from "express"
import { loginController, logoutController, registerController } from "../controllers/auth.controller"
import { checkLoggedIn } from "../middlewares/checkAuthentication"
const router = express.Router()

router.post("/login", checkLoggedIn, passport.authenticate("local"), loginController)

router.post("/logout", logoutController)

router.post("/register", checkLoggedIn, registerController)

router.post("/forgot-password", (req, res) => {
  res.send("forgot-password")
})

export default router
