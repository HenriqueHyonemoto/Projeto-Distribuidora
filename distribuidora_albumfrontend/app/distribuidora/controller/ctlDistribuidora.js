const axios = require("axios");

//@ Abre o formulário de manutenção de Distribuidora
const getAllDistribuidora = (req, res) =>
  (async () => {
    userName = req.session.userName;
    token = req.session.token;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllDistribuidora", {headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("distribuidora/view_manutencao", {
        title: "Manutenção de Distribuidora",
        data: resp.data,
        userName: userName,
      });
      
    } catch (erro) {
      console.log("[ctlDistribuidora.js|getAllDistribuidora] Try Catch:Erro de requisição");
    }
  })();

//@ Abre formulário de cadastro de Distribuidora
const openDistribuidoraInsert = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        res.render("distribuidora/view_cadDistribuidora", {
          title: "Cadastro de Distribuidora",
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  if (regFormPar.distribuidoraid == "") {
    regFormPar.distribuidoraid = 0;
  } else {
    regFormPar.distribuidoraid = parseInt(regFormPar.distribuidoraid);
  }

  regFormPar.ativo = regFormPar.ativo === "true"; //converte para true ou false um check componet
  regFormPar.removido = regFormPar.removido === "true"; //converte para true ou false um check componet

  return regFormPar;
}

//@ Abre formulário de cadastro de Distribuidora
const openDistribuidoraUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("distribuidora/view_cadDistribuidora", {
          title: "Cadastro de Distribuidora",
          oper: oper,
          idBusca: id,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "Try Catch: Erro não identificado",
        erro
      );
    }
  })();


//@ Recupera os dados dos Distribuidora
const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;
    parseInt(idBusca);
    console.log("[ctlDistribuidora.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/GetDistribuidoraByID",
        {
          distribuidoraid: idBusca,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.data.status == "ok") {
        res.json({ status: "ok", registro: resp.data.registro[0] });
      }
    } catch (error) {
      console.log(
        "[ctlDistribuidora.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

//@ Realiza inserção de Distribuidora
const insertDistribuidora = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.distribuidoraid = 0;
        console.log(
          "Valor do regPost: ", regPost
        );
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/InsertDistribuidora",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Distribuidora inserido com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao inserir distribuidora!" });
        }
      }
    } catch (erro) {
      console.log(
        "Try Catch: Erro não identificado",
        erro
      );
    }
  })();



//@ Realiza atualização de Distribuidora
const updateDistribuidora = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/UpdateDistribuidora",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Distribuidora atualizado com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao atualizar distribuidora!" });
        }
      }
    } catch (erro) {
      console.log(
        " Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

//@ Realiza remoção soft de Distribuidora
const deleteDistribuidora = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.distribuidoraid = parseInt(regPost.distribuidoraid);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/DeleteDistribuidora",
          {
            distribuidoraid: regPost.distribuidoraid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Distribuidora removido com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao remover distribuidora!" });
        }
      }
    } catch (erro) {
      console.log(
        "Try Catch: Erro não identificado", erro);
    }
  })();
module.exports = {
  getAllDistribuidora,
  openDistribuidoraInsert,
  openDistribuidoraUpdate,
  getDados,
  insertDistribuidora,
  updateDistribuidora,
  deleteDistribuidora,
};
