// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize("dbcontable", "root", '', {
//     host: "localhost",
//     dialect: "mysql",
//     port: "3306"
// }
// );

// module.exports = sequelize;

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME || "dbcontable",
//   process.env.DB_USER || "root",
//   process.env.DB_PASS || "",
//   {
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || "3306",
//     dialect: "mysql",
//     dialectOptions: process.env.DB_HOST
//       ? {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//         }
//       : {},
//     logging: false,
//   }
// );

// module.exports = sequelize;


const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "dbcontable",
  process.env.DB_USER || "appuser",
  process.env.DB_PASS || "Josema77",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    dialect: "mysql",
    logging: false
  }
);

module.exports = sequelize;
