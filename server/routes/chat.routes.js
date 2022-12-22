import express from "express";
import auth from "../middleware/auth.middleware.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
const router = express.Router({ mergeParams: true });
router.post("/", auth, async (req, res) => {
  try {
    const { _id } = req.user;

    const { userId } = req.body;
    if (!userId) {
      return res.sendStatus(400);
    }
    let isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: _id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (isChat.length > 0) {
      isChat = await User.populate(isChat, {
        path: "latestMessage.userId",
        select: "picturePath email",
      });
      res.send(isChat[0]);
    } else {
      const chatData = {
        users: [_id, userId],
      };
      let createdChat = await Chat.create(chatData);
      createdChat = await createdChat.populate(
        "users",
        "firstName picturePath lastName accountName"
      );
      res.status(200).send(createdChat);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const chat = await Chat.find({ users: { $elemMatch: { $eq: _id } } })
      .populate("users", "accountName picturePath firstName lastName")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    res.status(200).send(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
