$(function(){
    
    const socket = io();
    const mensajeForm = $('#mensaje-form')
    const mensaje = $('#mensaje')
    const chat = $('#chat')

    const nickForm = $('#nickform')
    const nickName = $('#nickname')
    const error = $('#error')

    const users = $('#usernames')

    nickForm.submit(e => {
        e.preventDefault()
        socket.emit('nuevo usuario',nickName.val(), nick => {

        } )
        nickName.val('')
    })
    mensajeForm.submit(e => {
        e.preventDefault()
        socket.emit('enviar mensaje',mensaje.val() )
        mensaje.val('')
    })

    socket.on('nuevo mensaje', function(mensaje){
        chat.append(mensaje + '<br/>')
    })


})