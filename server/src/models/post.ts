import { Schema, Types, model } from "mongoose"
import { z } from "zod"

export const PostZodSchema = z.object({
  _id: z.custom<Types.ObjectId>(),
  content: z.string().min(5, { message: "Must be 5 or more characters long" }),
  userId: z.custom<Types.ObjectId>(),
  likes: z.array(z.custom<Types.ObjectId>()).refine((items) => new Set(items).size === items.length, {
    message: "Must be an array of unique strings"
  }),
  comments: z.array(z.custom<Types.ObjectId>()).refine((items) => new Set(items).size === items.length, {
    message: "Must be an array of unique strings"
  }),
  likeCount: z.number(),
  commentCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const PostMongooseSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
)

PostMongooseSchema.virtual("likeCount").get(function () {
  return this.likes.length
})

PostMongooseSchema.virtual("commentCount").get(function () {
  return this.comments.length
})

export type Post = z.infer<typeof PostZodSchema>
export const Post = model("Post", PostMongooseSchema)
