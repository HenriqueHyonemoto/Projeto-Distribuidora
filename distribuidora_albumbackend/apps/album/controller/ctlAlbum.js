const mdlAlbum = require("../model/mdlAlbum");

const getAllAlbum = (req, res) =>
  (async () => {
    let registro = await mdlAlbum.getAllAlbum();
    res.json({ status: "ok", "registro": registro });
  })();

const getAlbumByID = (req, res) =>
  (async () => {
    const albumID = parseInt(req.body.albumid);
    let registro = await mdlAlbum.getAlbumByID(albumID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertAlbum = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const albumREG = request.body;    
    let { msg, linhasAfetadas } = await mdlAlbum.insertAlbum(albumREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateAlbum = (request, res) =>
  (async () => {
    const albumREG = request.body;
    let  { msg, linhasAfetadas } = await mdlAlbum.UpdateAlbum(albumREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeleteAlbum = (request, res) =>
  (async () => {
    const albumREG = request.body;
    let { msg, linhasAfetadas } = await mdlAlbum.DeleteAlbum(albumREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllAlbum,
  getAlbumByID,
  insertAlbum,
  updateAlbum,
  DeleteAlbum
};