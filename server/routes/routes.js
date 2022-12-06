import express from "express";
import usersRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import postRoutes from "./post.routes.js";
const router = express.Router({ mergeParams: true });
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/post", postRoutes);
export default router;
