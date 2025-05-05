// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from 'path';
dotenv.config({});
const _dirname = path.resolve();

const PORT = process.env.PORT || 8080;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "https://chat-application-full-stack-1.onrender.com",
  credentials: true,
};
app.use(cors(corsOption));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);


app.use(express.static(path.join(_dirname, "/frontened/dist")));
app.get('',(_, res) =>{
 res.sendFile( path.resolve(_dirname, "frontened", "dist", "index.html"));
})

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
