const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + "/projeto-iates"));

app.post("/api/mensagem", (req, res) => {
    console.log("Mensagem recebida:", req.body);

    return res.json({ message: "Mensagem enviada com sucesso!" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
