import { Schema, model } from "mongoose";
const schema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chatId: { type: Schema.Types.ObjectId, ref: "Chat" },
    // status:{type:Boolean}
  },
  { timestamps: true }
);
const Message = model("Message", schema);
export default Message;
