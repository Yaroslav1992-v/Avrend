import express from "express";
import User from "../models/User.js";
const router = express.Router({ mergeParams: true });
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.patch("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    console.log(req.body);
    if (userId === req.body._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unathorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
