"use strict";

var chat;

var animatedChat = setInterval(function () {
  if (chat && chat.length > 0) {
    var receivedMessage = chat.pop();
    createComponentMessage(
      receivedMessage.user.nickname,
      receivedMessage.message
    );
  }
  if (chat && chat.length == 0) {    
    onLoadGetMessages();
  }
}, 1000);

function onLoadGetMessages() {
  function fnSucesso({ data }) {
    chat = data;
  }

  useFetch(routes.mensagem, { fnSucesso }, {});
}

function createComponentMessage(userMenssage, mensagem) {
  let content = `
    <span class="lista_messagens__usuario">${userMenssage}</span>
    <p>${mensagem}</p>`;

  let listMensagem = document.querySelector(".lista_messagens");
  let novaMensagem = document.createElement("li");

  novaMensagem.className = "lista_messagens__item";
  novaMensagem.innerHTML = content;

  listMensagem.appendChild(novaMensagem);
  updateScroll()
}

//==================================================================

function onLoadGetUsuarios() {
  function fnSucesso({ data }) {
    data.map(function (list) {
      const { user } = list;
      createComponentUsuario(user.nickname);
    });
  }

  useFetch(routes.users, { fnSucesso }, {});
}

function createComponentUsuario(userName) {
  var listUsuarios = document.getElementById("lista_usuarios");
  var novoUsuario = document.createElement("li");
  novoUsuario.innerHTML = userName;
  listUsuarios.appendChild(novoUsuario);
}

//==================================================================

function onLoadButtonEnviar() {
  let buttonEnviar = document.getElementById("button_enviar")
  let inputMensagem = document.getElementById("input-mensagem")

  buttonEnviar.onclick = function () {
    sendMessage()
  };
  inputMensagem.onkeyup = function (event) {
    if (event.key === "Enter") {
      sendMessage()
    }
  }
}

function sendMessage() {
  var user = { name: "Igor" };
  let inputMensagem = document.getElementById("input-mensagem")

  createComponentMessage(user.name, inputMensagem.value)

  inputMensagem.value = ""
  inputMensagem.focus()
  updateScroll()
}

function updateScroll() {
  var sklListMessage = document.querySelector(".skl_list_message");
  sklListMessage.scrollTop = sklListMessage.scrollHeight;
}

window.addEventListener("load", function () {
  onLoadButtonEnviar();
  onLoadGetUsuarios();
  onLoadGetMessages();
});
