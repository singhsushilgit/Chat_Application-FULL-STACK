import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const allowedOrigins = ["http://localhost:8080", process.env.CLIENT_ORIGIN];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingTimeout: 60000,
});

const userSocketMap = {}; // {userId->socketId}
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};


io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;



  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
