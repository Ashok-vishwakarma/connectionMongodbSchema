const { sequelize } = require("../config/seqlizeConnection");
const { DataTypes } = require('sequelize')

const userToken = sequelize.define(
    'userToken',
    {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tokenNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        // Other model options go here
        tableName: 'userToken',
        createdAt: false,

    },
)



module.exports = { userToken }