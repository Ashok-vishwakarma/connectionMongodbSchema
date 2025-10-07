const { sequelize } = require('../config/seqlizeConnection')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'ABC'
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        email: {
            type: DataTypes.STRING,
        }
    },
    {
        // Other model options go here
        tableName: 'Users',
        createdAt: false,
        
    },
);

module.exports = User