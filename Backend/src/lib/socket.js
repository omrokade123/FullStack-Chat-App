import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: process.env.FRONTEND_URI || "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ["websocket", "polling"]
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//Use to store the online User
const userSocketMap = {};

io.on("connection",(socket) => {
    const userId = socket.handshake.query.userId;
    
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect",() => {
        // Only delete if this socket ID matches the stored socket ID for this user
        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
        }
        
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
})

export {io,app,server};