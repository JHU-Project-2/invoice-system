const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sent extends Model { }

Sent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        invoice_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'invoice',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'sent',
    }
);

module.exports = Sent;
