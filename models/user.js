const db = require('../modules/database');
const Sequelize = require('sequelize');

const User = db.define('user',{
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    jwt: {
        type: Sequelize.STRING,
    }
},{
    timestamps: false,
    underscored: true
});

module.exports = User;