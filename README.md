#ProjetoJS - Luxo Aluguel de Iates

Um site de demonstração para gerenciamento de mensagens de contato, desenvolvido em JavaScript, HTML e CSS, com área administrativa para visualizar e gerenciar mensagens enviadas pelos usuários.

---

#Funcionalidades

-Contato
*Envio de mensagens através do formulário de contato.
*Validação simples de campos obrigatórios.
*Mensagens enviadas são armazenadas via API.

-Área Administrativa
*Login protegido para usuários autorizados:
*Email
*Senha
*Redirecionamento automático para a página de mensagens em caso de login válido.
*Mensagem de erro em caso de login inválido.

-Mensagens Recebidas
*Lista todas as mensagens enviadas pelos usuários.
*Funcionalidades disponíveis para cada mensagem:
*Visualizada: altera a formatação para fonte normal.
*Excluir: remove a mensagem definitivamente.
*Confirmação antes de executar ações importantes.
*Mensagens novas aparecem em negrito para destaque.

---

#Estrutura do Projeto
ProjetoJS/
│
├─ index.html
├─ contato.html
├─ admin.html
├─ mensagens.html
│
├─ css/
│   └─ default.css
│
├─ js/
│   ├─ jquery-3.6.4.min.js
│   ├─ api.js
│   └─ functions.js
│
├─ images/
│   └─ barco1.png, barco2.png, ...
│
└─ README.md

---

#Como Executar

1. Clone o repositório: git clone https://github.com/mgabrielegoncalves/ProjetoJS.git
2. Abra o projeto no navegador:
 -Abra index.html em qualquer navegador moderno.
3. Navegue pelas páginas:
 -Página Inicial
 -Contato → enviar mensagens
 -Admin → login administrativo
 -Mensagens → visualizar e gerenciar mensagens

---

#Tecnologias Utilizadas
 -JavaScript → Lógica do projeto e integração com API
 -HTML5 → Estrutura das páginas
 -CSS3 → Estilo e layout responsivo
 -jQuery → Manipulação do DOM e chamadas AJAX

 ---
 
 #Observações Importantes
 Scripts devem ser importados nesta ordem:
  -jquery-3.6.4.min.js 
  -api.js
  -functions.js
As funções da API são essenciais:
 -inserirMensagem → enviar mensagens
 -validarUsuario → autenticação de login
 -obterMensagens → listar mensagens 

 ---

#Autor
 -Professor / Base do projeto: Gláucio Rocha
 -Implementação final: Gabriele Gonçalves
