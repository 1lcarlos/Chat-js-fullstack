module.exports = function (io) {
  let usuarios = {};

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("nuevo usuario", (nick, callback) => {
      if (nick in usuarios) {
        callback(false);
      } else {
        callback(true);
        socket.nickname = nick;
        usuarios[socket.nickname] = socket;
        actualizarNickNames();
      }
    });
    socket.on("enviar mensaje",  (mensaje, callback) => {
      let msg = mensaje.trim();
      if (msg.substr(0, 3) === "/w") {
        msg = msg.substr(3);
        const index = msg.indexOf(" ");
        if (index !== -1) {
          let name = msg.substring(0, index);
          let msg = msg.substring(index + 1);
          if (name in usuarios) {
            usuarios[name].emit("whisper", {
              msg,
              nick: socket.nickname,
            });
          } else {
            callback("Error valide el usuario antes de continuar");
          }
        } else {
          callback("Error por favor escribe tu mensaje");
        }
      } else {
        io.sockets.emit("nuevo mensaje", {
          msg: mensaje,
          nick: socket.nickname,
        });
      }
    });

    socket.on("disconnect", (nick) => {
      if (!socket.nickname) return;
      delete usuarios[socket.nickname];
      actualizarNickNames();
    });
    function actualizarNickNames() {
      io.sockets.emit("usernames", Object.keys(usuarios));
    }
  });
};
