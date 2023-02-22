$(function () {
  const socket = io();
  const mensajeForm = $("#mensaje-form");
  const mensaje = $("#mensaje");
  const chat = $("#chat");

  const nickForm = $("#nickform");
  const nickName = $("#nickname");
  const error = $("#error");

  const users = $("#usernames");

  nickForm.submit((e) => {
    e.preventDefault();
    socket.emit("nuevo usuario", nickName.val(), (nick) => {
      if (nick) {
        $("#contenedor-login").hide();
        $("#contenedor").show();
        $("#contenedor").css("display", "flex");
      } else {
        error.html(`<div>
                    el usuario ya existe
                </div>`);
      }
    });
    nickName.val("");
  });
  mensajeForm.submit((e) => {
    e.preventDefault();
    socket.emit("enviar mensaje", mensaje.val(), data =>{
        chat.append(`<p class= "error"> ${data} </p>`)
    });
    mensaje.val("");
  });

  socket.on("nuevo mensaje", function (mensaje) {
    chat.append("<b>"+ mensaje.nick +"</b>"+ mensaje.msg + "<br/>");
  });
  socket.on("usernames", (datos) => {
    let html = "";
    datos.forEach((user) => {
      html += `
      <div
    class="flex flex-row py-4 px-2 justify-center items-center border-b-2"
  >
    <div class="w-1/4">
      <img
        src="https://unavatar.io/${user}"
        class="object-cover h-12 w-12 rounded-full"
        alt=""
      />
    </div>
    <div class="w-full">
      <div class="text-lg font-semibold">${user}</div>
      
    </div>
  </div>
      `;
    });
    users.html(html);
  });
});
