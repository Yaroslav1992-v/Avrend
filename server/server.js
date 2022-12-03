import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/routes.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.PORT || 6001;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", routes);
mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    app.listen(PORT, () => console.log("server started on port : ", +PORT));
  })
  .catch((error) => console.log(`${error} did not connect`));
