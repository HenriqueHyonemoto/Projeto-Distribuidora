const express = require("express");
const routerApp = express.Router();

const appDistribuidora = require("../apps/distribuidora/controller/ctlDistribuidora");
const appAlbum = require("../apps/album/controller/ctlAlbum");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

//Rotas de Distribuidora
routerApp.get("/GetAllDistribuidora", appLogin.AutenticaJWT, appDistribuidora.GetAllDistribuidora);
routerApp.post("/GetDistribuidoraByID", appLogin.AutenticaJWT, appDistribuidora.GetDistribuidoraByID);
routerApp.post("/InsertDistribuidora", appLogin.AutenticaJWT, appDistribuidora.InsertDistribuidora);
routerApp.post("/UpdateDistribuidora", appLogin.AutenticaJWT, appDistribuidora.UpdateDistribuidora);
routerApp.post("/DeleteDistribuidora", appLogin.AutenticaJWT, appDistribuidora.DeleteDistribuidora);

//Rotas de Album
routerApp.get("/GetAllAlbum", appLogin.AutenticaJWT, appAlbum.getAllAlbum);
routerApp.post("/GetAlbumByID", appLogin.AutenticaJWT, appAlbum.getAlbumByID);
routerApp.post("/InsertAlbum", appLogin.AutenticaJWT, appAlbum.insertAlbum);
routerApp.post("/UpdateAlbum", appLogin.AutenticaJWT, appAlbum.updateAlbum);
routerApp.post("/DeleteAlbum", appLogin.AutenticaJWT, appAlbum.DeleteAlbum);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
