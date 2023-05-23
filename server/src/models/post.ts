import { Schema, Types, model } from "mongoose"
import { z } from "zod"

export const PostZodSchema = z.object({
  _id: z.custom<Types.ObjectId>(),
  content: z.string().min(5, { message: "Must be 5 or more characters long" }),
  userId: z.custom<Types.ObjectId>(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const PostMongooseSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  },
  { timestamps: true }
)

export type Post = z.infer<typeof PostZodSchema>
export const Post = model<Post>("Post", PostMongooseSchema)
