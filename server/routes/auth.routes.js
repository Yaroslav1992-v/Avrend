import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import tokenService from "../services/token.service.js";
const router = express.Router({ mergeParams: true });
router.post("/signUp", [
  check("email", "Invalid Email").isEmail(),
  check("password", "Password must contain at least 8 symbols").isLength({
    min: 8,
  }),
  check(
    "accountName",
    "Account Name  must contain at least 5 symbols"
  ).isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "User with this email already exists",
            code: 400,
          },
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: newUser._id });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
]);
router.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({
        error: {
          message: "email or password are incorrect",
          code: 400,
        },
      });
    }
    const isPasswordEqual = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordEqual) {
      return res.status(400).json({
        error: {
          message: "email or password are incorrect",
          code: 400,
        },
      });
    }
    const tokens = tokenService.generate({ _id: existingUser._id });
    await tokenService.save(existingUser._id, tokens.refreshToken);
    res.status(200).send({ ...tokens, userId: existingUser._id });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (!data && !dbToken && data._id !== dbToken?.user?.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tokens = await tokenService.generate({
      _id: data._id,
    });
    await tokenService.save(data._id, tokens.refreshToken);
    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
