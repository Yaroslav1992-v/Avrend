import express from "express";
import Comment from "../models/Comment.js";
import CommentLike from "../models/commentLike.js";
import Post from "../models/Post.js";
const router = express.Router({ mergeParams: true });
router.post("/", async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    const comment = await Comment.create({ ...req.body });
    post.comments.push(comment._id);
    post.save();
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const list = await Comment.find();
    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.delete("/:postId/:commentId", async (req, res) => {
  try {
    // const { _id } = req.user;
    const { commentId, postId } = req.params;
    const post = await Post.findById(postId);
    const comments = post.comments.filter((id) => id.toString() !== commentId);
    post.comments = comments;
    post.save();
    const removedComment = await Comment.findById(commentId);
    // if (removedComment.userId.toString() !== _id) {
    //   res.status(401).json({
    //     message: "Unauthorized",
    //   });
    // } else {
    await removedComment.remove();
    await CommentLike.deleteMany({ commentId: commentId });
    res.send(removedComment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.patch("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const list = await Comment.findByIdAndUpdate(commentId, req.body, {
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
