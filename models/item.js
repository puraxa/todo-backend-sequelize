const db = require('../modules/database');
const Sequelize = require('sequelize');

const Item = db.define('item', {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateCreated: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dateCompleted: {
        type: Sequelize.DATE,
    },
    isCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    underscored: true
});

module.exports = Item;