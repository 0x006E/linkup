import { badRequest } from "@hapi/boom"
import { Request, Response } from "express"
import { Types } from "mongoose"
import { z } from "zod"
import checkPostExists from "../helpers/checkPostExists"
import { zParse } from "../helpers/zParse"
import { Like } from "../models/like"

export const getPostLikes = async (req: Request, res: Response) => {
  const getPostLikesSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>()
    })
  })
  const { params } = await zParse(getPostLikesSchema, req)
  const { postId } = params
  await checkPostExists(postId)
  const likes = await Like.find({
    postId: postId
  }).populate('userId', 'name').lean()
  return res.status(200).json(likes)
}

export const likePost = async (req: Request, res: Response) => {
  const likePostSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>()
    })
  })
  const { params } = await zParse(likePostSchema, req)
  const { postId } = params
  await checkPostExists(postId)
  const like = await Like.exists({
    userId: req.user?._id,
    postId: postId
  })
  if (like) {
    return badRequest("Post already liked")
  }
  const newLike = await Like.create({
    userId: req.user?._id,
    postId: postId
  })
  return res.status(201).json(await newLike.populate('userId', 'name'))
}

export const unlikePost = async (req: Request, res: Response) => {
  const unlikePostSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>()
    })
  })
  const { params } = await zParse(unlikePostSchema, req)
  const { postId } = params
  await checkPostExists(postId)
  const like = await Like.exists({
    userId: req.user?._id,
    postId: postId
  })
  if (!like) {
    return badRequest("Post not liked")
  }
  await Like.findOneAndDelete({
    userId: req.user?._id,
    postId: postId
  })
  return res.status(200).json({ message: "Post like removed" })
}
