$(function(){
    
    const socket = io();
    const mensajeForm = $('#mensaje-form')
    const mensaje = $('#mensaje')
    const chat = $('#chat')

    mensajeForm.submit(e => {
        e.preventDefault()
        socket.emit('enviar mensaje',mensaje.val() )
        mensaje.val('')
    })

    socket.on('nuevo mensaje', function(mensaje){
        chat.append(mensaje + '<br/>')
    })


})