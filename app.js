var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var checkJwt = require('./modules/checkJWT');

const database = require('./modules/database');

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('todolist', 'pura', 'pura090394',{
//     hostname: 'localhost',
//     dialect: 'mysql'
// });

// sequelize.authenticate().then(() => console.log('connected')).catch(err => console.error(err));

// const User = sequelize.define('user',{
//     email:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     jwt: {
//         type: Sequelize.STRING,
//     }
// },{
//     timestamps: false,
//     sequelize,
//     underscored: true
// });

// const Todolist = sequelize.define('todolist',{
//     date_created: {
//         type: Sequelize.DATE,
//         allowNull: false,
//     },
//     name_of_list: {
//         type: Sequelize.DATE,
//         allowNull: false
//     }
// },{
//     timestamps: false,
//     sequelize,
//     underscored: true
// });

// const Item = sequelize.define('item', {
//     dateCreated: {
//         type: Sequelize.DATE,
//         allowNull: false
//     },
//     dateCompleted: {
//         type: Sequelize.DATE,
//         allowNull: false
//     },
//     isCompleted: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false
//     },
//     value: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// },{
//     timestamps: false,
//     sequelize,
//     underscored: true
// });

// User.hasMany(Todolist);
// Todolist.hasMany(Item);

// sequelize.sync();

const userPath = require('./routes/user');
const todoPath = require('./routes/todo');


var app = express();

app.use(cors({
    origin:true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userPath);
app.use(checkJwt);
app.use('/todo',todoPath);

module.exports = app;
