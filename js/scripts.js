$(document).ready(function () {
    if (estaLogado()) {
        var strBtn = '<a href="/perfil/" class="btn-startgames"><span class="ic-sx21"></span><span id="nomeLogin">' + getCookie('nome') + '</span></a>';
        if(getCookie('tipo') == 'empresa') {
            strBtn += '<a href="/cadastroVagas/" class="btn-startgames"><span class="ic-sx21"></span><span id="nomeLogin">Criar Vaga</span></a>';
        }

        document.querySelector("#nomeLogin").innerHTML = strBtn;

    } else {
        document.querySelector("#nomeLogin").innerHTML = '<a href="../login/" class="btn-startgames"><span class="ic-sx21"></span><span id="nomeLogin">Login</span></a>';
    }


    $.getJSON(endpointApi + "/vagas/", function (vagas) {
        vagas.forEach(vaga => {
            console.log(vaga);
            var nomeEmpresa;
            $.getJSON(
              endpointApi + "/empresas/" + vaga.idEmpresa,
              function (empresa) {
                nomeEmpresa = empresa.nome;
                var html =
                  '<div class="news-link">' +
                  '<img class="poster" src="/img/post.png" />' +
                  '<h3 class="news-log">' +
                  vaga.nome +
                  "</h3>" +
                  '<p class="description">' +
                  vaga.descricao +
                  '</p><a href="/vaga/?id="'+ vaga.id + 'class="btn-view"><span class="ic-sx24"></span>Inscreva-se</a>' +
                  '<span class="time-data">' +
                  nomeEmpresa +
                  "</span></div>";
                document.querySelector("#listVagas").innerHTML += html;
              }
            );

        });
    });

    $.getJSON(endpointApi + "/empresas", function (empresas) {
        // For para limitar o número de empresas que irão aparecer na tela inicial
        for (var a = 0; a < 10; a++) {
            var html = '<div class="server online">' +
                '<img src="img/empresa.png" width="15%" />' +
                '<a href="/perfil/?id=' + empresas[a].id + '&t=1"> ' + empresas[a].nome + '</a>' +
                '</div>';
            document.querySelector("#listEmpresas").innerHTML += html;
        }

        document.querySelector("#contEmpresas").innerHTML = empresas.length;
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