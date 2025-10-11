const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dbcontable = require("./models/index.model"); // tu DB actual
const routes = require("./routes/index.routes");

const app = express();

app.use(cors());
app.use(express.json());

//app.use(fileUpload());

app.use(
  fileUpload({
    useTempFiles: false, // evita conflictos de rutas temporales
  })
);

app.get("/", (req, res) => {
  res.send("¡Servidor activo y funcionando correctamente!");
});

app.use("/api", routes);

// Sincronizar la base de datos
dbcontable.sequelize
  //.sync({ alter: true })
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("BASE DE DATOS SINCRONIZADA");
  })
  .catch((err) => {
    console.error("ERROR EN SINCRONIZACIÓN DE BASE DE DATOS:", err);
  });

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}...`);
});
