import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import ConnectDB from './lib/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {  app, server } from './lib/socket.js';


dotenv.config();
app.use(cors({
    origin: "https://mern-chat-app-sawal612.vercel.app", // as we are using vite for frontend, we need to set this to the frontend url
    credentials: true, // as we are using cookies for authentication, we need to set this to true
}));

app.use(express.json({limit: '10mb'})); // as we are sending base64 encoded images, we need to set the limit to 10mb
app.use(cookieParser());
ConnectDB();

// routes
app.use('/api/auth', authRoutes);
app.use('/api/message',messageRoutes);


server.listen(3000 , () => {
    console.log('Server is running on port 3000');
});