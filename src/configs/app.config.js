// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize("dbcontable", "root", '', {
//     host: "localhost",
//     dialect: "mysql",
//     port: "3306"
// }
// );

// module.exports = sequelize;




const { Sequelize } = require('sequelize');

const dbcontable = new Sequelize(
  process.env.DB_NAME,   // defaultdb
  process.env.DB_USER,   // avnadmin
  process.env.DB_PASS,   // contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL === 'true',
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

module.exports = dbcontable;
