import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow all origins for testing purposes, you can restrict this in production
        credentials: true,
    },
});
export function getReceiverSocketId(userId) {
    return userSocketMap[userId]; // This function takes a userId as an argument and returns the corresponding socketId from the userSocketMap. If the userId does not exist in the map, it will return undefined.
}
// storing online users in a map where the key is the userId and the value is the socketId
const userSocketMap = {}; // { userId: socketId }

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    const userId = socket.handshake.query.userId; // Get the userId from the query parameters of the socket handshake
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    //.emit the list of online users to all connected clients whenever a new user connects or disconnects
    io.emit('onlineUsers', Object.keys(userSocketMap)); // Emit the list of online users to all connected clients
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit('onlineUsers', Object.keys(userSocketMap)); // Emit the updated list of online users to all connected clients
        }
    });
});

export { io, server, app };


