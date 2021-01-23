'use strict';
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        nombre: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: true,
            defaultValue: 1,
            type: DataTypes.STRING
        },
        online: {
            allowNull: true,
            defaultValue: false,
            type: DataTypes.BOOLEAN,

        },
    }, {
        timestamps: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        freezeTableName: true,
        tableName: 'usuarios',
        classMethods: {}
    });
    return Usuario;
};