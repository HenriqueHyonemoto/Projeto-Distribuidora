const axios = require("axios");
const moment = require("moment");

//@ Abre o formulário de manutenção de album
const getAllAlbum = (req, res) =>
  (async () => {
    userName = req.session.userName;
    token = req.session.token;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllAlbum", {headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },});
      console.log(resp);
      res.render("album/view_manutencao", {
        title: "Manutenção de album",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlAlbum.js|getAllAlbum] Try Catch:Erro de requisição");

    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  //@ *** Regra de validação
  //@ Como todos os campos podem ter valor nulo, vou me preocupar
  //@ com campo data_publicacao. Caso ele tenha valor "", vou atribuir null a ele.

  if (regFormPar.data_publicacao == "") {
    regFormPar.data_publicacao = null;
  }

  return regFormPar;
}

//@ Abre e faz operações de CRUD no formulário de cadastro de album
const insertAlbum = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var distribuidora = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        distribuidora = await axios.get(
          process.env.SERVIDOR_DW3 + "/GetAllDistribuidora",
          {headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },}
        );
        console.log("[crlAlbum|insertAlbum] valor de distribuidora:", distribuidora.data.registro);
        registro = {
          albumid: 0,
          numero_album: "",
          nome_album: "",
          data_publicacao: "",
          valor: "0000.00",
          distribuidoraid: 0,
          removido: false,
        };

        res.render("album/view_cadAlbum", {
          title: "Cadastro de album",
          data: registro,
          distribuidora: distribuidora.data.registro,
          oper: oper,
          userName: userName,
        });
      } else {
        oper = "c";
        const albumREG = validateForm(req.body);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/insertAlbum",
          {
            albumid: 0,
            numero_album: albumREG.numero_album,
            nome_album: albumREG.nome_album,
            data_publicacao: albumREG.data_publicacao,
            valor: albumREG.valor,
            distribuidoraid: albumREG.distribuidoraid,
            removido: false,
          },
          {
            headers: {  
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log("[ctlAlbum|insertAlbum] resp:", resp.data);
        if (resp.data.status == "ok") {
          //res.json({ status: "ok" });
          registro = {
            albumid: 0,
            numero_album: "",
            nome_album: "",
            data_publicacao: "",
            valor: "0.00",
            distribuidoraid: 0,
            removido: false,
          };
        } else {
          registro = albumREG;
        }
        distribuidora = await axios.get(
          process.env.SERVIDOR_DW3 + "/GetAllDistribuidora",
          {headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },}
        );
        oper = "c";
        res.render("album/view_cadAlbum", {
          title: "Cadastro de album",
          data: registro,
          distribuidora: distribuidora.data.registro,
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlAlbum.js|insertAlbum] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Abre o formulário de cadastro de album para futura edição
const viewAlbum = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var distribuidora = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;

        parseInt(id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/getAlbumByID",
          {
            albumid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          registro = resp.data.registro[0];
          registro.data_publicacao = moment(registro.data_publicacao).format(
            "YYYY-MM-DD"
          );
          distribuidora = await axios.get(
            process.env.SERVIDOR_DW3 + "/GetAllDistribuidora",
            {headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }}
          );
          console.log("[ctlAlbum|viewAlbum] GET oper:", oper);

          res.render("album/view_cadAlbum", {
            title: "Cadastro de album",
            data: registro,
            distribuidora: distribuidora.data.registro,
            oper: oper,
            userName: userName,
          });
        }
      } else {
        // Código vai entrar quando o usuário clicar no botão Alterar e requisição for POST
        oper = "vu";
        console.log("[ctlAlbum|viewAlbum] POST oper:", oper);
        const albumREG = validateForm(req.body);
        console.log("[ctlAlbum|viewAlbum] POST id:", albumREG.id);
        const id = parseInt(albumREG.id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateAlbum",
          {
            albumid: id,
            numero_album: albumREG.numero_album,
            nome_album: albumREG.nome_album,
            data_publicacao: albumREG.data_publicacao,
            valor: albumREG.valor,
            distribuidoraid: albumREG.distribuidoraid,
            removido: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok" });
        } else {
          res.json({ status: "erro" });
        }
      }
      
    } catch (erro) {
      res.json({ status: "[ctlAlbum.js|viewAlbum] Album não pode ser alterado" });
      console.log(
        "[ctlAlbum.js|viewAlbum] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Abre o formulário de cadastro de album
const DeleteAlbum = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      oper = "v";
      const id = parseInt(req.body.id);

      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeleteAlbum",
        {
          albumid: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok" });
      } else {
        res.json({ status: "erro" });
      }
    } catch (erro) {
      console.log(
        "[ctlAlbum.js|DeleteAlbum] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

module.exports = {
  getAllAlbum,
  //cadAlbum,
  //getAlbumByID,
  viewAlbum,
  insertAlbum,
  //updateAlbum,
  DeleteAlbum,
};
