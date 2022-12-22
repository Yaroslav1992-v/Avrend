import { Schema, model } from "mongoose";
const schema = Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User" },
    notifier: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },
    typeId: { type: String, required: true },
    parentId: { type: String },
    read: { type: Boolean, default: false },
    seen: { type: Boolean, default: false },
    typeName: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);
const Notification = model("Notification", schema);
export default Notification;
