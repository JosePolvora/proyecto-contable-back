const { Sequelize } = require("sequelize");
const sequelize = require("../configs/app.config.js");

const dbcontable = {};

dbcontable.Sequelize = Sequelize;
dbcontable.sequelize = sequelize;

// Modelos
dbcontable.Usuario = require("./usuario.model.js")(sequelize, Sequelize);
dbcontable.Expediente = require("./expediente.model.js")(sequelize, Sequelize);

// 🔹 Relaciones

// 1️⃣ Expediente ↔ Usuario
dbcontable.Expediente.belongsTo(dbcontable.Usuario, {
  foreignKey: "usuario_id",
  as: "usuario",
});
dbcontable.Usuario.hasMany(dbcontable.Expediente, {
  foreignKey: "usuario_id",
  as: "expedientes",
});

module.exports = dbcontable;
