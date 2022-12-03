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
export default router;
