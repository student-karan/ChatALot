import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { app, server, io } from "./lib/socket.js";
import { connectdb } from "./lib/db.js";
import authRouter from "./routes/auth_Route.js";
import messageRouter from "./routes/message_Route.js";
import cookieParser from "cookie-parser";
import path from "path";

import cors from "cors";
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd", "index.html", "dist"))
  })
}
app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).send(message);
})

server.listen(port, () => {
  console.log("app listening on port:" + port);
  connectdb();
})