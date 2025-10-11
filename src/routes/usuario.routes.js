const express = require("express");
const usuarioController = require("../controllers/usuario.controller");
const routes = express.Router();

// 👉 CRUD Usuarios
routes.post("/usuarios", usuarioController.createUsuario);
routes.get("/usuarios", usuarioController.getUsuarios);
routes.get("/usuarios/:id", usuarioController.getUsuarioById);
routes.put("/usuarios/:id", usuarioController.updateUsuario);
routes.delete("/usuarios/:id", usuarioController.deleteUsuario);

// 👉 Login
routes.post("/usuarios/login", usuarioController.loginUsuario);

// 👉 Crear usuario admin
routes.post("/usuarios/admin", usuarioController.createUsuarioAdmin);

module.exports = routes;
