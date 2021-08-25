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
    var tipo = url.searchParams.get("t");
    console.log(getCookie("id"))

    // <span style="font-weight: bold; font-size: 22px;" id="userNome">Lavyk Soares</span><br />
    // <span style="" id="userEmail">lavyk_@hotmail.com</span><br />
    // <span style="" id="userTipo">Candidato</span><br /><br />
    // <span style="" id="userEndereco">Rua João Alves Diniz, 40, Campina Grande - PB</span><br />

    if (tipo == "0" && id != null) {

        var linkFinal = endpointApi + '/candidatos/' + id;
        $.ajax({
            url: linkFinal,
            type: 'GET',
            success: function (candidato) {
                // Se retornar sucesso lista os dados do candidato
                document.querySelector("#userNome").innerHTML = candidato.nome;
                document.querySelector("#userEmail").innerHTML = candidato.email;
                document.querySelector("#userTipo").innerHTML = "Candidato";
                var endereco = candidato.bairro + ", " + candidato.cidade + " - " + candidato.estado;
                document.querySelector("#userEndereco").innerHTML = endereco;

                $.getJSON(endpointApi + "/vagas/" + getCookie("idVaga"), function (vagas) {
                    var html = "";
                    vagas.forEach(vaga => {
                        html +=
                            '<div class="news-link">' +
                            '<h3 class="news-log">' +
                            vaga.nome +
                            "</h3>" +
                            '<p >Jornada: ' +
                            vaga.jornada +
                            '</p> <p>' +
                            '<p class="description">Número de vagas: ' +
                            vaga.disponivel +
                            '</p> <p class="description">' +
                            vaga.descricao +
                            '</p><a href="/vaga/?id=' + vaga.id + '" class="btn-view"><span class="ic-sx24"></span>Ver vaga</a>' +
                            '<span class="time-data"></span></div>';

                        document.querySelector("#listVagas").innerHTML = "";
                        document.querySelector("#listVagas").innerHTML = html;

                    });
                });

            },
            error: function (a, b, c) {
                document.querySelector("#userNome").innerHTML = "Não encontrado";
                document.querySelector("#userEmail").innerHTML = "";
                document.querySelector("#userTipo").innerHTML = "";
                document.querySelector("#userEndereco").innerHTML = "";
                // Se retornar erro ele volta para a pagina anterior
                //window.history.back();
            }
        });
    } else if (tipo == "1" && id != null) {
        // Empresa que estiver vendo outra empresa
        var linkFinal = endpointApi + '/empresas/' + id;
        $.ajax({
            url: linkFinal,
            type: 'GET',
            success: function (empresa) {
                // Se retornar sucesso lista os dados da empresa
                document.querySelector("#userNome").innerHTML = empresa.nome;
                document.querySelector("#userEmail").innerHTML = empresa.email;
                document.querySelector("#userTipo").innerHTML = "Empresa";
                var endereco = empresa.bairro + ", " + empresa.cidade + " - " + empresa.estado;
                document.querySelector("#userEndereco").innerHTML = endereco;

                $.getJSON(endpointApi + "/vagas/", function (vagas) {
                    vagas.forEach(vaga => {
                        if (vaga.idEmpresa == id) {
                            //console.log(vaga.id);

                            var html =
                                '<div class="news-link">' +
                                '<img class="poster" src="/img/post.png" />' +
                                '<span class="hot-news">' + vaga.disponivel + ' vagas</span>' +
                                '<h3 class="news-log">' +
                                vaga.nome +
                                "</h3>" +
                                '<p class="description">Jornada: ' +
                                vaga.jornada +
                                '</p> <p class="description">' +
                                vaga.descricao +
                                '</p><a href="/vaga/?id=' + vaga.id + '" class="btn-view"><span class="ic-sx24"></span>Ver vaga</a>' +
                                '<span class="time-data"></span></div>';
                            document.querySelector("#listVagas").innerHTML += html;
                        }

                    });
                });

            },
            error: function (a, b, c) {
                document.querySelector("#userNome").innerHTML = "Não encontrado";
                document.querySelector("#userEmail").innerHTML = "";
                document.querySelector("#userTipo").innerHTML = "";
                document.querySelector("#userEndereco").innerHTML = "";
                // Se retornar erro ele volta para a pagina anterior
                //window.history.back();
            }
        });
    } else {
        if (estaLogado()) {
            document.querySelector("#userNome").innerHTML = getCookie("nome");
            document.querySelector("#userEmail").innerHTML = getCookie("email");
            document.querySelector("#userTipo").innerHTML = getCookie("tipo");
            var endereco = getCookie("bairro") + ", " + getCookie("cidade") + " - " + getCookie("estado");
            document.querySelector("#userEndereco").innerHTML = endereco;

            $.getJSON(endpointApi + "/vagas/", function (vagas) {
                var html = "";
                var cont = 0;
                vagas.forEach(vaga => {
                    if (vaga.idEmpresa == getCookie("id")) {
                        html +=
                            '<div class="news-link">' +
                            '<h3 class="news-log">' +
                            vaga.nome +
                            "</h3>" +
                            '<p >Jornada: ' +
                            vaga.jornada +
                            '</p> <p>' +
                            '<p class="description">Número de vagas: ' +
                            vaga.disponivel +
                            '</p> <p class="description">' +
                            vaga.descricao +
                            '</p><a href="/vaga/?id=' + vaga.id + '" class="btn-view"><span class="ic-sx24"></span>Ver vaga</a>' +
                            '<span class="time-data"></span></div>';
                        cont++;
                    }
                    if (cont > 0) {
                        document.querySelector("#listVagas").innerHTML = "";
                        document.querySelector("#listVagas").innerHTML = html;
                    }
                });
            });


        } else {
            document.querySelector("#userNome").innerHTML = "Não encontrado";
            document.querySelector("#userEmail").innerHTML = "";
            document.querySelector("#userTipo").innerHTML = "";
            document.querySelector("#userEndereco").innerHTML = "";
        }
    }
});




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
