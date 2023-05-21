import { Schema, model } from "mongoose";

export const postSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    likeCount: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
