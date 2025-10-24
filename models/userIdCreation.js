const { sequelize } = require("../config/seqlizeConnection");
const { DataTypes } = require('sequelize')

const userIdCreation = sequelize.define(
    'userIdCreation',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        // Other model options go here
        tableName: 'userIdCreation',
        createdAt: false,

    },
)



module.exports = { userIdCreation }