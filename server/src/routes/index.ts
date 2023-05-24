import express from "express"
import authRouter from "./auth"
import postRouter from "./post"
import userRouter from "./user"

const indexRouter = express.Router()

indexRouter.use("/api/auth", authRouter)
indexRouter.use("/api/posts", postRouter)
indexRouter.use("/api/user", userRouter)

export default indexRouter
