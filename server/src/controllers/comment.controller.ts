import { notFound } from "@hapi/boom"
import { Request, Response } from "express"
import { Types } from "mongoose"
import { z } from "zod"
import checkPostExists from "../helpers/checkPostExists"
import { zParse } from "../helpers/zParse"
import { Comment, CommentZodSchema } from "../models/comment"

export const getPostComments = async (req: Request, res: Response) => {
  const getPostCommentSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>()
    })
  })
  const { params } = await zParse(getPostCommentSchema, req)
  const { postId } = params
  await checkPostExists(postId)
  const comments = await Comment.find({ postId: postId }).populate('userId', 'name').lean()
  return res.status(200).json(comments)
}

export const createPostComment = async (req: Request, res: Response) => {
  const createPostCommentSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>()
    }),
    body: z.object({
      content: z.string()
    })
  })
  const { params, body } = await zParse(createPostCommentSchema, req)
  const { postId } = params
  const { content } = body
  await checkPostExists(postId)
  const comment = await Comment.create({
    content,
    postId: postId,
    userId: req.user?._id
  })
  return res.status(201).json(await comment.populate('userId', 'name'))
}

export const updatePostComment = async (req: Request, res: Response) => {
  const updatePostCommentSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>(),
      commentId: z.custom<Types.ObjectId>()
    }),
    body: CommentZodSchema.pick({ content: true })
  })
  const { params, body } = await zParse(updatePostCommentSchema, req)
  const { postId, commentId } = params
  const { content } = body
  await checkPostExists(postId)
  const comment = await Comment.findOneAndUpdate({ _id: commentId, userId: req.user?._id }, { content }, { new: true })
  if (!comment) {
    throw notFound("Comment not found")
  }
  return res.status(200).json(await comment.populate('userId', 'name'))
}

export const deletePostComment = async (req: Request, res: Response) => {
  const deletePostCommentSchema = z.object({
    params: z.object({
      postId: z.custom<Types.ObjectId>(),
      commentId: z.custom<Types.ObjectId>()
    })
  })
  const { params } = await zParse(deletePostCommentSchema, req)
  const { postId, commentId } = params
  await checkPostExists(postId)
  const comment = await Comment.findOneAndDelete({ _id: commentId, userId: req.user?._id })
  if (!comment) {
    throw notFound("Comment not found")
  }
  return res.json({ message: "Comment deleted" })
}
