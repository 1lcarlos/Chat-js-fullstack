module.exports = function (io) {
  let nickNames = [];

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("nuevo usuario", (nick, callback) => {
      
      if (nickNames.indexOf(nick) != -1) {
        callback(false);
      } else {
        callback(true);
        socket.nickname = nick;
        nickNames.push(socket.nickname);
        actualizarNickNames();
      }
    });
    socket.on("enviar mensaje", function (mensaje) {
      io.sockets.emit("nuevo mensaje", {
        data: mensaje,
        nick: socket.nickname
      });
    });

    socket.on("disconnect", nick => {
      if (!socket.nickname) return;
      nickNames.splice(nickNames.indexOf(socket.nickname), 1);
      actualizarNickNames();
    });
    function actualizarNickNames() {
      io.sockets.emit("usernames", nickNames);
    }
  });
};
