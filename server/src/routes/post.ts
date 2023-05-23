import express from "express"
import { deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller"
import { checkAuthenticated } from "../middlewares/checkAuthentication"
import commentRouter from "./comment"
import likeRouter from "./like"

const postRouter = express.Router()

postRouter.use("/:postId/likes", likeRouter)
postRouter.use("/:postId/comments", commentRouter)

postRouter.get("/", checkAuthenticated, getPosts)

postRouter.get("/:postId", checkAuthenticated, getPost)

postRouter.put("/:postId", checkAuthenticated, updatePost)

postRouter.delete("/:postId", checkAuthenticated, deletePost)

export default postRouter
