const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    // usuario_id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },

    usuario_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    apellido: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    sector: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    clave: {
      type: DataTypes.STRING(255), // hash bcrypt por ejemplo
      allowNull: false,
    },

    rol: {
      type: DataTypes.ENUM("usuario", "admin"),
      allowNull: false,
      defaultValue: "usuario",
    },

    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  return Usuario;
};
