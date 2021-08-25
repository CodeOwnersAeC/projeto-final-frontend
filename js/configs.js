var endpointApi = "https://localhost:5001";

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function estaLogado() {
  if (getCookie("nome") != null) {
    return true;
  } else {
    return false;
  }
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function sair() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    window.location.href = "/";
}

$(document).ready(function () {
  if (estaLogado()) {
    var strBtn =
      '<a href="/perfil/" class="btn-startgames"><span class="ic-sx21"></span><span id="nomeLogin">' +
      getCookie("nome") +
      "</span></a>";
    if (getCookie("tipo") == "empresa") {
      strBtn +=
        '<a href="/cadastroVagas/" class="btn-startgames"><span class="ic-sx21"></span><span id="nomeLogin">Criar Vaga</span></a>';
    }

    strBtn +=
      '<a href="#" onclick="sair()" class="btn-login" style="margin-left: 10px"><span class="ic-sx22"></span><span>Sair</span></a>';

    document.querySelector("#nomeLogin").innerHTML = strBtn;
  } else {
    document.querySelector("#nomeLogin").innerHTML =
      '<a href="../login/" class="btn-startgames"><span class="ic-sx21"></span><span id="nomeLogin">Login</span></a>';
  }
});
