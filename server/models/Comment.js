import { Schema, model } from "mongoose";
const schema = Schema(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);
const Like = model("Like", schema);
export default Like;
