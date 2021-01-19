

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mensajes = sequelize.define(
    "Mensajes",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      de: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      para: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      mensaje: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      freezeTableName: true,
      tableName: "mensajes",
      classMethods: {},
    }
  );
  return Mensajes;
};
