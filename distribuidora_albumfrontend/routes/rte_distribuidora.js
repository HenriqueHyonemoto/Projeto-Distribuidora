var express = require('express');
var distribuidoraApp = require("../app/distribuidora/controller/ctlDistribuidora")

//var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');


//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
  // Verificar se existe uma sessão válida.
  isLogged = req.session.isLogged;

  if (!isLogged) {
    res.redirect("/Login");
  }
  next();
};

/* GET métodos */
router.get('/', authenticationMiddleware, distribuidoraApp.getAllDistribuidora);
router.get('/openDistribuidoraInsert', authenticationMiddleware, distribuidoraApp.openDistribuidoraInsert);
router.get('/openDistribuidoraUpdate/:id', authenticationMiddleware, distribuidoraApp.openDistribuidoraUpdate);

/* POST métodos */
router.post('/insertDistribuidora', authenticationMiddleware, distribuidoraApp.insertDistribuidora);
router.post('/getDados', authenticationMiddleware, distribuidoraApp.getDados);
router.post('/updateDistribuidora', authenticationMiddleware, distribuidoraApp.updateDistribuidora);
router.post('/deleteDistribuidora', authenticationMiddleware, distribuidoraApp.deleteDistribuidora);


module.exports = router;