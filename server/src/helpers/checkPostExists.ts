import { notFound } from "@hapi/boom"
import { Types } from "mongoose"
import { Post } from "../models/post"

export default async function checkPostExists(postId: Types.ObjectId) {
  try {
    const post = await Post.findById(postId)
    if (!post) {
      throw notFound("Post not found")
    }
    return post
  } catch (error) {
    throw notFound("Post not found")
  }
}
