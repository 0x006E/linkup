import { Schema, model } from "mongoose";

export const LikeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
  },
  { timestamps: true }
);

export const Like = model("Like", LikeSchema);
