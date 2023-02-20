module.exports = function(io){

    let nickNames = []; 

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('nuevo usuario', (nick, callback) =>{
          console.log(nick)
          if (nickNames.indexOf(nick) !=-1) {
            callback(false)
          }else{
            callback(true)
            socket.nickname = nick;
            nickNames.push(socket.nickname)
            io.sockets.emit('usernames', nickNames)
          }
        })
        socket.on('enviar mensaje', function(mensaje) {
          io.sockets.emit('nuevo mensaje', mensaje)
        })
      });
}


