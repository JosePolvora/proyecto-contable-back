// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize("dbcontable", "root", '', {
//     host: "localhost",
//     dialect: "mysql",
//     port: "3306"
// }
// );

// module.exports = sequelize;



// src/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,   // defaultdb en Aiven
  process.env.DB_USER,   // avnadmin
  process.env.DB_PASS,   // tu contraseña de Aiven
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false // opcional
  }
);

module.exports = sequelize;
