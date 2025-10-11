const express = require("express");
const uploadController = require("../controllers/upload.controller");

const routes = express.Router();

// 📁 Ruta para carga masiva de expedientes desde Excel
routes.post("/expedientes/upload-excel", uploadController.uploadFile);

module.exports = routes;
