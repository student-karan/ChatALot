import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  }
});
// to show online users
const onlineUsers = {} // {userId:socketId}

function recieverSocketId(userid){
  return onlineUsers[userid];
}

io.on("connection", (socket) => {
  console.log("A user connected ", socket.id);

  let userId = socket.handshake.query.userId;
  if(userId){
    onlineUsers[userId] = socket.id
  }
  io.emit("getOnlineUsers",Object.keys(onlineUsers));
 
  socket.on("disconnect", () => {
    console.log("A user disconnected ", socket.id);
    delete onlineUsers[userId];
    io.emit("getOnlineUsers",Object.keys(onlineUsers));
  })
})
export { io, app, server, recieverSocketId };