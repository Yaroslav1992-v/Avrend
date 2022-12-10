import { Schema, model } from "mongoose";
const schema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    picturePath: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: String,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);
const Post = model("Post", schema);
export default Post;
