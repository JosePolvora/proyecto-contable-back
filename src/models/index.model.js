// const { Sequelize } = require("sequelize");
// const sequelize = require("../configs/app.config.js");

// const dbcontable = {};

// dbcontable.Sequelize = Sequelize;
// dbcontable.sequelize = sequelize;

// // Modelos
// dbcontable.Usuario = require("./usuario.model.js")(sequelize, Sequelize);
// dbcontable.Expediente = require("./expediente.model.js")(sequelize, Sequelize);
// dbcontable.Movimiento = require("./movimiento.model.js")(sequelize, Sequelize);

// // 🔹 Relaciones

// // 1️⃣ Expediente ↔ Usuario

// dbcontable.Expediente.belongsTo(dbcontable.Usuario, {
//   foreignKey: "usuario_id",
//   as: "usuario",
// });
// dbcontable.Usuario.hasMany(dbcontable.Expediente, {
//   foreignKey: "usuario_id",
//   as: "expedientes",
// });

// // 2️⃣ Movimiento ↔ Expediente
// dbcontable.Movimiento.belongsTo(dbcontable.Expediente, {
//   foreignKey: "expediente_id",
// });
// dbcontable.Expediente.hasMany(dbcontable.Movimiento, {
//   foreignKey: "expediente_id",
// });

// // ⚠️ Movimiento ↔ Usuario: no se relaciona directamente según lo hablado

// module.exports = dbcontable;


// const { Sequelize } = require("sequelize");
// const sequelize = require("../configs/app.config.js");

// const dbcontable = {};

// dbcontable.Sequelize = Sequelize;
// dbcontable.sequelize = sequelize;

// // Modelos
// dbcontable.Usuario = require("./usuario.model.js")(sequelize, Sequelize);
// dbcontable.Expediente = require("./expediente.model.js")(sequelize, Sequelize);
// dbcontable.Movimiento = require("./movimiento.model.js")(sequelize, Sequelize);

// // 🔹 Relaciones

// // 1️⃣ Expediente ↔ Usuario
// dbcontable.Expediente.belongsTo(dbcontable.Usuario, {
//   foreignKey: "usuario_id",
//   as: "usuario",
// });
// dbcontable.Usuario.hasMany(dbcontable.Expediente, {
//   foreignKey: "usuario_id",
//   as: "expedientes",
// });

// // 2️⃣ Movimiento ↔ Expediente
// dbcontable.Movimiento.belongsTo(dbcontable.Expediente, {
//   foreignKey: "expediente_id",
//   as: "expediente",
// });
// dbcontable.Expediente.hasMany(dbcontable.Movimiento, {
//   foreignKey: "expediente_id",
//   as: "movimientos",
// });

// // 🔹 Movimiento ↔ Usuario (a través del expediente, no directo)
// // Se incluirá en consultas con include: movimiento -> expediente -> usuario

// module.exports = dbcontable;


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
