import { Schema, model } from "mongoose";
const schema = Schema(
  {
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);
const CommentLike = model("CommentLike", schema);
export default CommentLike;
