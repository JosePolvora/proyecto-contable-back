// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize("dbcontable", "root", '', {
//     host: "localhost",
//     dialect: "mysql",
//     port: "3306"
// }
// );

// module.exports = sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "dbcontable", // base de datos
  "appuser", // usuario
  "Josema77", // contraseña
  {
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
