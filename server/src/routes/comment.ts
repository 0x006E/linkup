import express from "express"
import {
  createPostComment,
  deletePostComment,
  getPostComments,
  updatePostComment
} from "../controllers/comment.controller"
import { checkAuthenticated } from "../middlewares/checkAuthentication"

const commentRouter = express.Router({ mergeParams: true })

commentRouter.get("/", checkAuthenticated, getPostComments)

commentRouter.post("/:commentId", checkAuthenticated, createPostComment)

commentRouter.put("/:commentId", checkAuthenticated, updatePostComment)

commentRouter.delete("/:commentId", checkAuthenticated, deletePostComment)

export default commentRouter
