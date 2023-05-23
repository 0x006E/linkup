import { Schema, Types, model } from "mongoose"
import { z } from "zod"

export const LikeZodSchema = z.object({
  _id: z.custom<Types.ObjectId>(),
  userId: z.custom<Types.ObjectId>(),
  postId: z.custom<Types.ObjectId>(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const LikeMongooseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" }
  },
  { timestamps: true }
)

export type Like = z.infer<typeof LikeZodSchema>
export const Like = model<Like>("Like", LikeMongooseSchema)
