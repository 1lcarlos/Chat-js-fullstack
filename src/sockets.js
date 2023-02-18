module.exports = function(io){
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('enviar mensaje', function(mensaje) {
          io.sockets.emit('nuevo mensaje', mensaje)
        })
      });
}


