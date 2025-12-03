(function($) {
  const LS_MSG_KEY = "mensagens_local";     
  const LS_DELETED_KEY = "mensagens_deleted";

  function getMsgId(msg, index) {
    if (msg.id) return String(msg.id);
    if (msg._id) return String(msg._id);
    if (msg.timestamp) return String(msg.timestamp) + "-" + index;
    return (msg.email || "") + "|" + (msg.nome || "") + "|" + index;
  }

  function saveLocal(msgs) {
    localStorage.setItem(LS_MSG_KEY, JSON.stringify(msgs));
  }

  function loadLocal() {
    const raw = localStorage.getItem(LS_MSG_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function loadDeletedIds() {
    const raw = localStorage.getItem(LS_DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function saveDeletedIds(arr) {
    localStorage.setItem(LS_DELETED_KEY, JSON.stringify(arr));
  }

  function syncWithBackend() {
    const remote = obterMensagens() || [];
    const deletedIds = new Set(loadDeletedIds());
    const local = loadLocal();
    const localMap = {};
    local.forEach(m => {
      if (m.__localId) localMap[m.__localId] = m;
      else {
        const id = getMsgId(m, 0);
        localMap[id] = m;
      }
    });

    const merged = [];
    remote.forEach((m, idx) => {
      const id = getMsgId(m, idx);
      if (deletedIds.has(id)) return; 

      const loc = localMap[id] || {};
      const visualizada = (typeof loc.visualizada === "boolean") ? loc.visualizada : (m.visualizada === true);

      merged.push({
        __localId: id,
        id: m.id || m._id || null,
        nome: m.nome || "",
        email: m.email || "",
        mensagem: m.mensagem || "",
        recebidoEm: m.recebidoEm || m.createdAt || m.timestamp || null,
        visualizada: visualizada
      });
    });

    local.forEach(lm => {
      if (!lm.__localId) return;
      const exists = merged.some(mm => mm.__localId === lm.__localId);
      if (!exists && !deletedIds.has(lm.__localId)) {
        merged.push(lm);
      }
    });

    saveLocal(merged);
    return merged;
  }

  function renderTable(msgs) {
    const tbody = $("#mensagens-body");
    tbody.empty();

    if (!msgs || msgs.length === 0) {
      tbody.append(`<tr><td colspan="3" style="text-align:center; color:#666">Nenhuma mensagem encontrada</td></tr>`);
      return;
    }

    msgs.forEach((m, i) => {
      const estilo = m.visualizada ? "" : "font-weight:bold;";
      const linha = $(`
        <tr data-id="${m.__localId}" style="${estilo}">
          <td>${escapeHtml(m.nome)}</td>
          <td>${escapeHtml(m.email)}</td>
          <td>
            ${escapeHtml(m.mensagem)}
            <div style="margin-top:5px;">
              <button class="visualizada">Marcar visualizada</button>
              <button class="excluir">Excluir</button>
            </div>
          </td>
        </tr>
      `);
      tbody.append(linha);
    });
  }

  function escapeHtml(text) {
    if (text === null || text === undefined) return "";
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function marcarVisualizada(localId) {
    if (!confirm("Deseja marcar esta mensagem como visualizada?")) return;
    const msgs = loadLocal();
    const idx = msgs.findIndex(m => m.__localId === localId);
    if (idx === -1) return;
    msgs[idx].visualizada = true;
    saveLocal(msgs);
    renderTable(msgs);
    bindActions();
  }

  function excluirMensagem(localId) {
    if (!confirm("Deseja realmente excluir esta mensagem?")) return;
    let msgs = loadLocal();
    msgs = msgs.filter(m => m.__localId !== localId);
    const deleted = loadDeletedIds();
    deleted.push(localId);
    saveDeletedIds(deleted);
    saveLocal(msgs);
    renderTable(msgs);
    bindActions();
  }

  function bindActions() {
    $("#mensagens-body").off("click", "button");
    $("#mensagens-body").on("click", "button", function() {
      const tr = $(this).closest("tr");
      const localId = tr.attr("data-id");
      if ($(this).hasClass("visualizada")) {
        marcarVisualizada(localId);
      } else if ($(this).hasClass("excluir")) {
        excluirMensagem(localId);
      }
    });
  }

  function atualizarTudo() {
    const merged = syncWithBackend();
    renderTable(merged);
    bindActions();
  }

  $(document).ready(function() {
    atualizarTudo();
    setInterval(atualizarTudo, 6000); 
  });

  window.__mensagensDebug = {
    atualizarTudo,
    loadLocal,
    loadDeletedIds,
    saveLocal
  };

})(jQuery);
