const db = require('../modules/database');
const Sequelize = require('sequelize');

const Todolist = db.define('todolist',{
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date_created: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    name_of_list: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    underscored: true
});

module.exports = Todolist;