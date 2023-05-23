import express from "express"
import { getPostLikes, likePost, unlikePost } from "../controllers/like.controller"
import { checkAuthenticated } from "../middlewares/checkAuthentication"

const likeRouter = express.Router({ mergeParams: true })

likeRouter.get("/", checkAuthenticated, getPostLikes)

likeRouter.post("/", checkAuthenticated, likePost)

likeRouter.delete("/", checkAuthenticated, unlikePost)

export default likeRouter
