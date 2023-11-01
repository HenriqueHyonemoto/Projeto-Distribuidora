const express = require("express");
const routerApp = express.Router();

const appDistribuidora = require("../apps/distribuidora/controller/ctlDistribuidora");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

//Rotas de Distribuidora
routerApp.get("/GetAllDistribuidora", appLogin.AutenticaJWT, appDistribuidora.GetAllDistribuidora);
routerApp.post("/GetDistribuidoraByID", appLogin.AutenticaJWT, appDistribuidora.GetDistribuidoraByID);
routerApp.post("/InsertDistribuidora", appLogin.AutenticaJWT,   appDistribuidora.InsertDistribuidora);
routerApp.post("/UpdateDistribuidora", appLogin.AutenticaJWT,   appDistribuidora.UpdateDistribuidora);
routerApp.post("/DeleteDistribuidora", appLogin.AutenticaJWT,   appDistribuidora.DeleteDistribuidora);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
