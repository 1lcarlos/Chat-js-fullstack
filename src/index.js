const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


  app.set('port', process.env.PORT || 3000)

require("./sockets")(io);

 app.use(express.static(path.join(__dirname, "public")));

/*  io.on('connection', (socket) => {
    console.log('a user connected');
  }); */

server.listen(app.get('port'), () => {
  console.log("listening on *:", app.get('port'));
});

