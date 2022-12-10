import express from "express";
import CommentLike from "../models/commentLike.js";
import Like from "../models/Like.js";
const router = express.Router({ mergeParams: true });
router.post("/post", async (req, res) => {
  try {
    const like = await Like.create({ ...req.body });
    res.status(200).send(like);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.post("/comment", async (req, res) => {
  try {
    const like = await CommentLike.create({ ...req.body });
    res.status(200).send(like);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/comment", async (req, res) => {
  try {
    const like = await CommentLike.find();
    res.status(200).send(like);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/post", async (req, res) => {
  try {
    const like = await Like.find();
    res.status(200).send(like);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/comment/:likeId", async (req, res) => {
  try {
    const { likeId } = req.params;
    const like = await CommentLike.findByIdAndDelete(likeId);
    res.status(200).send(like);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/post/:likeId", async (req, res) => {
  try {
    const { likeId } = req.params;
    const like = await Like.findByIdAndDelete(likeId);
    res.status(200).send(like);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
