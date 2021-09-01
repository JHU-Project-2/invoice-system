const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Address extends Model { }

Address.init(
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
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'company',
                key: 'id',
            },
        },


    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'address',
    }
);

module.exports = Address;
