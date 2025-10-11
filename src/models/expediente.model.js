const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Expediente = sequelize.define(
    "expediente",
    {
      expediente_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      numero: {
        type: DataTypes.STRING(50),
        allowNull: false,
        //unique: true,
      },

      asunto: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      clase: {
        type: DataTypes.ENUM(
          "Auditoria",
          "Derivacion",
          "Ecodaic",
          "Hospitales",
          "Rendicion",
          "Servicios Publicos",
          "Otros"
        ),
        allowNull: false,
      },

      // usuario_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },

      usuario_id: {
        type: DataTypes.INTEGER.UNSIGNED, // agrega UNSIGNED
        allowNull: true,
      },

      tipoMovimiento: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      observacion: {
        type: DataTypes.ENUM(
          "Devolucion",
          "Controlado - Op",
          "Retenido",
          "Patrimonial",
          "Tesoreria",
          "Corregido",
          "Solicitado",
          "Archivado",
          "Autorizar gasto",
          "Rendicion",
          "Falta Credito"
        ),
        allowNull: true,
      },

      fechaIngreso: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      comentarios: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      terminado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      fechaEnvio: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      // 👇 Nuevos campos para manejar reingresos
      fechaReingreso: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      reingresos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "expedientes",
      timestamps: true,
    }
  );

  return Expediente;
};
