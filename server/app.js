import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

const secretKeyJWT = "asdasdasdasdasdawf"

const port = 3000;

const app = express();

const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    },
});

app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }));

app.get('/',(req,res)=>{
    res.send("Hello World!");
});

app.get('/login',(req,res)=>{
    const token = jwt.sign({_id:"asdasjasdjas"},secretKeyJWT )

    res.cookie("token",token,{httpOnly: true,secure:true,sameSite:"none"})
    .json({
        message: "Login Success",
    });
});

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
  
    socket.on("message", ({ room, message }) => {
      const time = new Date().toLocaleTimeString();
      const messageData = {
        message,
        time,
        sender: socket.id,  // or use the user info if available
      };
      console.log(messageData);
      io.to(room).emit("receive-message", messageData);
    });
  
    socket.on("joined-room", (room) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});