import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

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

  let userId = socket.handshake.query.userId;
  if(userId){
    onlineUsers[userId] = socket.id
  }
  io.emit("getOnlineUsers",Object.keys(onlineUsers));
 
  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers",Object.keys(onlineUsers));
  })
})
export { io, app, server, recieverSocketId };