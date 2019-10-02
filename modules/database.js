const Sequelize = require('sequelize');
const db = JSON.parse(process.env.DB);
const {host, database, username, password} = db;
const sequelize = new Sequelize(database, username, password,{
    hostname: host,
    dialect: 'mysql',
    logging: false
});
module.exports = sequelize;