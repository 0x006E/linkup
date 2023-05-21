import { Schema, model } from "mongoose";

export const PostSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

PostSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

PostSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

export const Post = model("Post", PostSchema);
