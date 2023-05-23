import express from "express"
import authRouter from "./auth"
import postRouter from "./post"
import userRouter from "./user"

const indexRouter = express.Router()

indexRouter.use("/auth", authRouter)
indexRouter.use("/posts", postRouter)
indexRouter.use("/user", userRouter)

export default indexRouter
