import express from "express";
import Post from "../models/Post.js";
const router = express.Router({ mergeParams: true });
router.get("/", async (req, res) => {
  try {
    const data = await Post.find();
    res.send(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const post = await Post.create({ ...req.body });
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    return res.send(null);
  } catch (error) {
    {
      res.status(500).json({
        message: error.message,
      });
    }
  }
});
router.patch("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const list = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
