import { Schema, model } from "mongoose";
const schema = Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    removedIn: [{ type: Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);
const Chat = model("Chat", schema);
export default Chat;
