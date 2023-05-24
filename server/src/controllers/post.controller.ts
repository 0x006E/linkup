import { notFound } from "@hapi/boom"
import { Request, Response } from "express"
import mongoose, { Types } from "mongoose"
import { z } from "zod"
import checkPostExists from "../helpers/checkPostExists"
import { zParse } from "../helpers/zParse"
import { Comment } from "../models/comment"
import { Like } from "../models/like"
import { Post, PostZodSchema } from "../models/post"

export const createPost = async (req: Request, res: Response) => {
  const createPostSchema = z.object({
    body: PostZodSchema.pick({ content: true })
  })
  const { body } = await zParse(createPostSchema, req)
  const { content } = body
  const post = await Post.create({
    content,
    userId: req.user?._id
  })
  return res.status(201).json(await post.populate('userId', 'name'))
}

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().populate('userId', 'name').sort({ createdAt: -1 }).lean()
  return res.status(200).json(posts)
}

export const getPost = async (req: Request, res: Response) => {
  const getPostSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>()
    })
  })
  const { params } = await zParse(getPostSchema, req)
  const { postId } = params
  const post = await Post.findById({
    _id: postId
  }).populate('userId', 'name').lean()
  if (!post) {
    throw notFound("Post not found")
  }
  return res.status(200).json(post)
}

export const updatePost = async (req: Request, res: Response) => {
  const updatePostSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>()
    }),
    body: PostZodSchema.pick({ content: true })
  })
  const { params, body } = await zParse(updatePostSchema, req)
  const { postId } = params
  const { content } = body
  const post = await checkPostExists(postId)
  post.content = content
  await post.save()

  return res.status(200).json(await post.populate('userId', 'name'))
}

export const deletePost = async (req: Request, res: Response) => {
  const deletePostSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>()
    })
  })
  const { params } = await zParse(deletePostSchema, req)
  const { postId } = params
  const post = await Post.findById({
    _id: postId
  })
  if (!post) {
    throw notFound("Post not found")
  }
  const session = await mongoose.startSession()
  const transaction = await session.withTransaction(async () => {
    await Post.deleteOne({ _id: postId }).session(session)
    await Like.deleteMany({ postId: postId }).session(session)
    return Comment.deleteMany({ postId: postId }).session(session)
  })
  session.endSession()
  if (!transaction) {
    throw new Error("Post deletion failed")
  }
  return res.status(200).json({ message: "Post deleted" })
}
