const mdlDistribuidora = require("../model/mdlDistribuidora");

const GetAllDistribuidora = (req, res) =>
  (async () => {
    let registro = await mdlDistribuidora.GetAllDistribuidora();
    res.json({ status: "ok", registro: registro });
  })();

const GetDistribuidoraByID = (req, res) =>
  (async () => {
    const distribuidoraID = parseInt(req.body.distribuidoraid);
    let registro = await mdlDistribuidora.GetDistribuidoraByID(distribuidoraID);

    res.json({ status: "ok", registro: registro });
  })();

const InsertDistribuidora = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlDistribuidora.InsertDistribuidora(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateDistribuidora = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlDistribuidora.UpdateDistribuidora(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteDistribuidora = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlDistribuidora.DeleteDistribuidora(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
module.exports = {
  GetAllDistribuidora,
  GetDistribuidoraByID,
  InsertDistribuidora,
  UpdateDistribuidora,
  DeleteDistribuidora
};
