const db = require("../../../database/databaseconfig");

const getAllAlbum = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT nome_distribuidora from distribuidora where distribuidoraid = album.distribuidoraid)" +
      "FROM album where removido = false ORDER BY nome_album ASC"
    )
  ).rows;
};

const getAlbumByID = async (albumIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT nome_distribuidora from distribuidora where distribuidoraid = album.distribuidoraid)" +
      "FROM album WHERE albumid = $1 and removido = false ORDER BY nome_album ASC",
      [albumIDPar]
    )
  ).rows;
};

const insertAlbum = async (albumREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO album " + "values(default, $1, $2, $3, $4, $5, $6)",
        [
          albumREGPar.numero_album,
          albumREGPar.nome_album,
          albumREGPar.data_publicacao,
          albumREGPar.valor,
          albumREGPar.distribuidoraid,
          albumREGPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlbum|insertAlbum] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateAlbum = async (albumREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE album SET " +
          "numero_album = $2, " +
          "nome_album = $3, " +
          "data_publicacao = $4, " +
          "valor = $5, " +
          "distribuidoraid = $6, " +
          "removido = $7 " +
          "WHERE albumid = $1",
        [
          albumREGPar.albumid,
          albumREGPar.numero_album,
          albumREGPar.nome_album,
          albumREGPar.data_publicacao,
          albumREGPar.valor,
          albumREGPar.distribuidoraid,
          albumREGPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlbum|UpdateAlbum] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteAlbum = async (albumREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE album SET " + "removido = true " + "WHERE albumid = $1",
      [albumREGPar.albumid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlAlbum|DeleteAlbum] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllAlbum,
  getAlbumByID,
  insertAlbum,
  UpdateAlbum,
  DeleteAlbum,
};
