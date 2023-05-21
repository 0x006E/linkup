import { Schema, model } from "mongoose";

export const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Comment = model("Comment", commentSchema);
