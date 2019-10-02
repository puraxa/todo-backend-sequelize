var Todolist = require('../models/todolist');

const checkId = async(req, res, next) => {
    try {
        const search = await Todolist.findByPk(req.params.id);
        if(search.dataValues.userId !=  req.payload.id){
            throw {
                status: 401,
                message: `You don't have permissions on this todo list`
            }
        }
        next();
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
}

module.exports = checkId;