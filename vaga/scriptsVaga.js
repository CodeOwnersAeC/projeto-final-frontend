$(document).ready(function () {
  // if ($('#select').val() == 'empresa') {
  //     $.ajax({
  //         url: endpointApi + '/empresa',
  //         type: 'POST',
  //         data: $('form').serialize(),
  //         success: function (result) {
  //             console.log(result);
  //         },
  //         error: function (request, status, error) {
  //             alert(request.responseText);
  //         }
  //     });
  // }

  var url = new URL(location.href);
  var id = url.searchParams.get("id");

  // <span style="font-weight: bold; font-size: 22px;" id="userNome">Lavyk Soares</span><br />
  // <span style="" id="userEmail">lavyk_@hotmail.com</span><br />
  // <span style="" id="userTipo">Candidato</span><br /><br />
  // <span style="" id="userEndereco">Rua João Alves Diniz, 40, Campina Grande - PB</span><br />

  if (id != null) {
    var linkFinal = endpointApi + "/vagas/" + id;
    $.ajax({
      url: linkFinal,
      type: "GET",
      success: function (vaga) {
        // Se retornar sucesso lista os dados do candidato
        document.querySelector("#vagaNome").innerHTML = vaga.nome;
        document.querySelector("#vagaDescricao").innerHTML = vaga.descricao;
        document.querySelector("#vagaJornada").innerHTML =
          "Jornada: " + vaga.jornada + "h";
        document.querySelector("#vagaVagasDisponiveis").innerHTML =
          "Vagas disponiveis: " + vaga.disponivel;
        console.log(vaga);
        if (getCookie("tipo") == "candidato") {
          var html;
          if (getCookie("idVaga") != id && getCookie("idVaga") == 0) {
            html = '<a href="#" onclick="realizarCadastro()">Inscreva-se</a>';
          } else {
            html = "Você está inscrito nessa vaga.</a>";
          }

          document.querySelector("#btnInscreva").innerHTML = html;
        }

        var linkFinal = endpointApi + "/empresas/" + vaga.idEmpresa;
        $.ajax({
          url: linkFinal,
          type: "GET",
          success: function (empresa) {
            console.log(empresa);
            // Se retornar sucesso lista os dados do candidato
            document.querySelector("#vagaEmpresa").innerHTML = empresa.nome;
          },
          error: function (a, b, c) {
            document.querySelector("#vagaEmpresa").innerHTML = "{Empresa}";
          },
        });

        linkFinal = endpointApi + "/candidatos/";
        $.ajax({
          url: linkFinal,
          type: "GET",
          success: function (candidatos) {
            candidatos.array.forEach((candidato) => {
              if (candidato.idVaga == vaga.id) {
                var html =
                  '<a href="../perfil/?id=' +
                  candidato.id +
                  '&t=0">' +
                  candidato.nome +
                  "</a><br/>";
                document.querySelector("#listCandidatos").innerHTML += html;
              }
            });
          },
          error: function (a, b, c) {
            document.querySelector("#listCandidatos").innerHTML =
              "Erro de conexão.";
          },
        });
      },
      error: function (a, b, c) {
        alert(vaga);
        document.querySelector("#vagaNome").innerHTML = "Vaga não encontrada.";
        // Se retornar erro ele volta para a pagina anterior
        //window.history.back();
      },
    });
  } else {
    window.location.href = "../";
  }
});

function realizarCadastro() {
  var linkFinal = $.ajax({
    url: linkFinal,
    type: "POST",
    data: "id=" + getCookie("id") + ";idVaga=" + id,
    success: function (vaga) {
      alert(
        "Você se inscreveu na vaga, aguarde até a empresa entrar em contato."
      );
      window.location.href = "../vaga/?id=" + id;
    },
    error: function (a, b, c) {
      alert(
        "Aconteceu algum erro ao realizar sua inscrição, por favor tente novamente mais tarde."
      );
      // Se retornar erro ele volta para a pagina anterior
      //window.history.back();
    },
  });
}

// //Consulta o webservice viacep.com.br/
// $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

//     if (!("erro" in dados)) {
//         //Atualiza os campos com os valores da consulta.
//         $("#rua" + id).val(dados.logradouro);
//         $("#bairro" + id).val(dados.bairro);
//         $("#cidade" + id).val(dados.localidade);
//         $("#uf" + id).val(dados.uf);
//         $("#ibge" + id).val(dados.ibge);
//     } //end if.
//     else {
//         //CEP pesquisado não foi encontrado.
//         limpa_formulário_cep();
//         alert("CEP não encontrado.");
//     }
// });
