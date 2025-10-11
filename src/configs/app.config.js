const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("dbcontable", "root", '', {
    host: "localhost",
    dialect: "mysql",
    port: "3306"
}
);

module.exports = sequelize;