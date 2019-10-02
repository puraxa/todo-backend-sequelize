var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require('dotenv').config();

var checkJwt = require('./modules/checkJWT');
const database = require('./modules/database');
const User = require('./models/user');
const Todolist = require('./models/todolist');
const Item = require('./models/item');

User.hasMany(Todolist);
Todolist.hasMany(Item);

database.sync();

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
