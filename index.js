const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

/* app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  }); */

  app.use(express.static("public"));
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });


/* import { createServer } from "http";
import express from "express";
import { Socket, Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server)
io.on('conection', (Socket) =>{
    console.log('nuevo usuario conectado')
})

app.use(express.static("public"));

app.listen(3000);
console.log("Server on port 3000"); */
