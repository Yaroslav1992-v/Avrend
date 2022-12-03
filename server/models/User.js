import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    firstName: {
      type: String,
      min: 1,
      max: 50,
    },
    lastName: {
      type: String,
      min: 1,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    friends: {
      type: Array,
      default: [],
    },
    picturePath: String,
    location: String,
    occupation: String,
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
