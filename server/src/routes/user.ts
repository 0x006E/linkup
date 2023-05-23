import express from "express"
import { getUserDetails, updateUserDetails, updateUserPassword } from "../controllers/user.controller"
import { checkAuthenticated } from "../middlewares/checkAuthentication"
const userRouter = express.Router()

userRouter.get("/", checkAuthenticated, getUserDetails)
userRouter.post("/", checkAuthenticated, updateUserDetails)
userRouter.post("/change-password", checkAuthenticated, updateUserPassword)

export default userRouter
