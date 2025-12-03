$(document).ready(function(){
  const tabela = $("#tabelaMensagens tbody");
  
  function render(){
    tabela.empty();
    const msgs = obterMensagens();
    if(!msgs.length) {
      tabela.append('<tr><td colspan="4">Nenhuma mensagem encontrada</td></tr>');
      return;
    }

    msgs.forEach((m, i) => {
      const tr = $("<tr></tr>").css("font-weight", m.visualizada ? "normal" : "bold");
      tr.append(`<td>${m.nome}</td>`);
      tr.append(`<td>${m.email}</td>`);
      tr.append(`<td>${m.mensagem}</td>`);
      const tdAcoes = $("<td></td>");
      const btnVisualizada = $('<button class="visualizada">Visualizada</button>');
      const btnExcluir = $('<button class="excluir">Excluir</button>');

      btnVisualizada.click(() => {
        if(confirm("Marcar como visualizada?")){
          m.visualizada = true;
          render();
        }
      });

      btnExcluir.click(() => {
        if(confirm("Deseja excluir a mensagem?")){
          msgs.splice(i,1);
          render();
        }
      });

      tdAcoes.append(btnVisualizada, btnExcluir);
      tr.append(tdAcoes);
      tabela.append(tr);
    });
  }

  render();
});
