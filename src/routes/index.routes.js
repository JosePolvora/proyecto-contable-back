const express = require("express");
const routes = express.Router();

// TODAS LAS RUTAS ⬇⬇⬇

const usuarioRoutes = require("./usuario.routes");
routes.use("/", usuarioRoutes);

const expedienteRoutes = require("./expediente.routes");
routes.use("/", expedienteRoutes);

// Ruta para subir Excel
const uploadRoutes = require("./upload.routes");
routes.use("/", uploadRoutes); 

module.exports = routes;
