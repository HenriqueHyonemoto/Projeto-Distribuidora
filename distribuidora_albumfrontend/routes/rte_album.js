var express = require('express');
var albumApp = require("../app/album/controller/ctlAlbum")

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
router.get('/', authenticationMiddleware, albumApp.getAllAlbum);
router.get('/insertAlbum', authenticationMiddleware, albumApp.insertAlbum);
router.get('/viewAlbum/:id/:oper', authenticationMiddleware, albumApp.viewAlbum);

/* POST métodos */
router.post('/insertAlbum', authenticationMiddleware, albumApp.insertAlbum);
router.post('/DeleteAlbum', authenticationMiddleware, albumApp.DeleteAlbum);
router.post('/viewAlbum', authenticationMiddleware, albumApp.viewAlbum);


module.exports = router;