$(document).ready(function () {
  if (estaLogado()) {
    //document.querySelector("#home-sec").innerHTML = "";
  }

  $.getJSON(endpointApi + "/vagas/", function (vagas) {
    vagas.forEach((vaga) => {
      //console.log(vaga.id);

      var html =
        '<div class="news-link">' +
        '<img class="poster" src="/img/post.png" />' +
        '<span class="hot-news">' +
        vaga.disponivel +
        " vagas</span>" +
        '<h3 class="news-log">' +
        vaga.nome +
        "</h3>" +
        '<p class="description">Jornada: ' +
        vaga.jornada +
        '</p> <p class="description">' +
        vaga.descricao +
        '</p><a href="/vaga/?id=' +
        vaga.id +
        '" class="btn-view"><span class="ic-sx24"></span>Ver vaga</a>' +
        '<span class="time-data"></span></div>';
      document.querySelector("#listVagas").innerHTML += html;

      // var nomeEmpresa;
      // await $.getJSON(
      //   endpointApi + "/empresas/" + vaga.idEmpresa,
      //   function (empresa) {
      //     nomeEmpresa = empresa.nome;
      //     var html =
      //       '<div class="news-link">' +
      //       '<img class="poster" src="/img/post.png" />' +
      //       '<h3 class="news-log">' +
      //       vaga.nome +
      //       "</h3>" +
      //       '<p class="description">' +
      //       vaga.descricao +
      //       '</p><a href="/vaga/?id="'+ vaga.id + 'class="btn-view"><span class="ic-sx24"></span>Inscreva-se</a>' +
      //       '<span class="time-data">' +
      //       nomeEmpresa +
      //       "</span></div>";
      //     document.querySelector("#listVagas").innerHTML += html;
      //   }
      // );
    });
  });

  $.getJSON(endpointApi + "/empresas", function (empresas) {
    // For para limitar o número de empresas que irão aparecer na tela inicial

    document.querySelector("#contEmpresas").innerHTML = empresas.length;
    for (var a = 0; a < 10; a++) {
      var html =
        '<div class="server online">' +
        '<img src="img/empresa.png" width="15%" />' +
        '<a href="/perfil/?id=' +
        empresas[a].id +
        '&t=1"> ' +
        empresas[a].nome +
        "</a>" +
        "</div>";
      document.querySelector("#listEmpresas").innerHTML += html;
    }

    // empresas.forEach(empresa => {
    //     console.log(empresa.nome);
    //     var html = '<div class="server online">' +
    //         '<img src="img/empresa.png" width="15%" />' +
    //         '<a href="#"> ' + empresa.nome + '</a>' +
    //         '</div>';
    //     document.querySelector("#listEmpresas").innerHTML += html;
    //     contListEmpresas++;
  });
});
