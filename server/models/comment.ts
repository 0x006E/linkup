import { Schema, Types, model } from "mongoose";
import { z } from "zod";

export const CommentZodSchema = z.object({
  _id: z.custom<Types.ObjectId>(),
  content: z.string().min(5).max(1000),
  userId: z.custom<Types.ObjectId>(),
  postId: z.custom<Types.ObjectId>(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CommentMongooseSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export type Comment = z.infer<typeof CommentZodSchema>;
export const Comment = model("Comment", CommentMongooseSchema);
