import express from "express";
import usersRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
const router = express.Router({ mergeParams: true });
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
export default router;
