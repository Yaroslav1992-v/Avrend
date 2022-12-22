import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes/routes.js";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { createServer } from "http";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.PORT || 6001;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    server.listen(PORT, () => console.log("server started on port : ", +PORT));
  })
  .catch((error) => console.log(`${error} did not connect`));

// const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData);
    socket.emit("connected");
  });
  socket.on("join chat", (chat) => {
    socket.join(chat);
    console.log("user joined room : ", chat);
  });
  // socket.off("join chat", () => {
  //   console.log("User disconneced");
  //   socket.leave(userData);
  // });
  socket.on("new message", (message, to, from) => {
    const users = io.sockets.adapter.rooms.get(message.chatId).size;
    console.log(users);
    socket.emit("users check", users);

    socket.broadcast.to(to).emit("message recieved", message);
  });
  socket.on("notify", (notification, to) => {
    socket.broadcast.to(to).emit("notify recieved", notification);
  });
  socket.on("deletedNot", (deletedNot, to) => {
    socket.broadcast.to(to).emit("notify removed", deletedNot);
  });
  socket.on("typing", (chat, to) => {
    socket.broadcast.to(to).emit("typing", chat);
  });
  socket.on("stop typing", (chat, to) =>
    socket.broadcast.to(to).emit("stop typing", chat)
  );
  socket.off("setup", () => {
    console.log("User disconneced");
    socket.leave(userData);
  });
});
