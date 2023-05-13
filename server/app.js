const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');

app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello")
    console.log("hello")
})

//io - server side object
//socket - client side object

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`an user connected with ID : ${socket.id}`)

    socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`an user with Id ${socket.id} joined the room ${data}`)
    })

    socket.on("send_message", (data)=>{
        console.log(data)
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", ()=>{
        console.log(`${socket.id} left the chat`)
    })
})

server.listen(3001, ()=>{
    console.log("SERVER IS ON PORT 3001")
})