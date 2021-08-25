$(document).ready(function () {
  if (getCookie("tipo") == "empresa" && estaLogado()) {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    document.querySelector("#idEmpresa").value = getCookie("id");
  } else {
    window.location.href = "../";
  }

  function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
      indexed_array[n["name"]] = n["value"];
    });

    return indexed_array;
  }

  $("#btnRegister").click(function () {
    //console.log($('form').serialize());
    var $form = $("form");
    var dataJson = getFormData($form);
    console.log(dataJson);
    $.ajax({
      url: endpointApi + "/vagas/",
      type: "PUT",
      data: JSON.stringify(dataJson),
      success: function (result) {
        alert("Sua vaga foi cadastrada com sucesso.");
        window.location.href = "../perfil/";
      },
      error: function (request, status, error) {
        alert("Aconteceu algum erro, tente novamente mais tarde.");
        console.log(request.responseText);
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  });
});
