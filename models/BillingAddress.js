const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BillingAddress extends Model { }

BillingAddress.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address_1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_2: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'invoice',
                key: 'id',
            },
        },


    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'BillingAddress',
    }
);

module.exports = BillingAddress;
