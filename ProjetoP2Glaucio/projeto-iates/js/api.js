function obterMensagens() {
  let retorno = [];
  $.ajax({
    url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
    method: 'GET',
    dataType: 'json',
    async: false
  }).done(function(data){
    retorno = data;
  });
  return retorno;
}

function inserirMensagem(mensagem){
  $.ajax({
    url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    async: false,
    data: JSON.stringify(mensagem)
  });
}

function validarUsuario(objLoginSenha){
  let retorno = false;
  $.ajax({
    url: 'https://app-p2-js-c88e9128234a.herokuapp.com/usuarios/validar',
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    async: false,
    data: JSON.stringify(objLoginSenha)
  }).done(function(data){
    retorno = data;
  });
  return retorno;
}
