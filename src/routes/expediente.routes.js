const express = require("express");
const expedienteController = require("../controllers/expediente.controller");
const routes = express.Router();

// 👉 CRUD Expedientes
routes.post("/expedientes", expedienteController.createExpediente);

routes.get("/expedientes", expedienteController.getExpedientes);
routes.get(
  "/expedientes/historial",
  expedienteController.getExpedientesHistorial
);
// rutas/expediente.routes.js
routes.get(
  "/expedientes/numero/:numero",
  expedienteController.getExpedienteByNumero
);

routes.get("/expedientes/:id", expedienteController.getExpedienteById);

routes.put("/expedientes/:id", expedienteController.updateExpediente);

routes.delete("/expedientes/:id", expedienteController.deleteExpediente);

// ✅ Nueva ruta para traer expedientes por usuario
routes.get(
  "/expedientes/usuario/:id",
  expedienteController.getExpedientesByUsuario
);

module.exports = routes;
