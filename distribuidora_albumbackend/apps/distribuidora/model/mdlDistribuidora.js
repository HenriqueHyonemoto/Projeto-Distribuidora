const db = require("../../../database/databaseconfig");

const GetAllDistribuidora = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM distribuidora where removido = false ORDER BY nome_distribuidora ASC"
    )
  ).rows;
};

const GetDistribuidoraByID = async (distribuidoraIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM distribuidora WHERE distribuidoraid = $1 and removido = false ORDER BY nome_distribuidora ASC",
      [distribuidoraIDPar]
    )
  ).rows;
};

const InsertDistribuidora = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de bd.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO distribuidora " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
          registroPar.numero_distribuidora,
          registroPar.nome_distribuidora,
          registroPar.sede_distribuidora,
          registroPar.fundacao,
          registroPar.taxa_vendas,
          registroPar.ativo,
          registroPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlDistribuidora|insertDistribuidora] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateDistribuidora = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE distribuidora SET " +
          "numero_distribuidora = $2, " +
          "nome_distribuidora = $3, " +
          "sede_distribuidora = $4, " +
          "fundacao = $5, " +  
          "taxa_vendas = $6, " +
          "ativo = $7, " +  
          "removido = $8 " +          
          "WHERE distribuidoraid = $1",
        [
            registroPar.distribuidoraid  ,
            registroPar.numero_distribuidora,
            registroPar.nome_distribuidora,
            registroPar.sede_distribuidora,
            registroPar.fundacao,
            registroPar.taxa_vendas,
            registroPar.ativo,
            registroPar.removido,          
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlDistribuidora|UpdateDistribuidora] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeleteDistribuidora = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE distribuidora SET " + "removido = true " + "WHERE distribuidoraid = $1",
      [registroPar.distribuidoraid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlDistribuidora|DeleteDistribuidora] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  GetAllDistribuidora,
  GetDistribuidoraByID,
  InsertDistribuidora,
  UpdateDistribuidora,
  DeleteDistribuidora,
};