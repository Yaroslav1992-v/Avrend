import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/Token.js";
dotenv.config();
export default new (class tokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.accessKey, {
      expiresIn: "1000h",
    });
    const refreshToken = jwt.sign(payload, process.env.refreshKey);
    return {
      accessToken,
      refreshToken,
      expiresIn: 3600000,
    };
  }
  async save(user, refreshToken) {
    const data = await Token.findOne({ user });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({ user, refreshToken });
    return token;
  }
  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.refreshKey);
    } catch (error) {
      return null;
    }
  }
  validateAccess(accessToken) {
    try {
      return jwt.decode(accessToken, process.env.accessKey);
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
})();
