const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize('todolist', 'pura', 'pura090394',{
    hostname: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate().then(() => console.log('connected')).catch(err => console.error(err));

const User = sequelize.define('user',{
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
    sequelize,
    underscored: true
});

const Todolist = sequelize.define('todolist',{
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
    sequelize,
    underscored: true
});

const Item = sequelize.define('item', {
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
    sequelize,
    underscored: true
});

User.hasMany(Todolist);
Todolist.hasMany(Item);

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Todolist = Todolist;
db.Item = Item;

module.exports = db;