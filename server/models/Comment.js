import { Schema, model } from "mongoose";
const schema = Schema(
  {
    content: { type: String, required: true },
    parentId: { type: String, default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accountName: { type: String },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    replies: [],
    likes: [{ type: Schema.Types.ObjectId, ref: "CommentLike" }],
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);
const Comment = model("Comment", schema);
export default Comment;
