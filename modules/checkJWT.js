const jwt = require('jsonwebtoken');
const db = require('./database');

const checkJwt = async(req, res, next) => {
    try {
        const payload = await jwt.verify(req.headers.authorization, 'SECRETKEY');
        const search = await db.User.findByPk(payload.id);
        if(search.dataValues.jwt != req.headers.authorization){
            throw {
                status: 401,
                message: 'Invalid authorization token'
            }
        }
        req.payload = payload;
        next();
    } catch (err) {
        res.status(err.status || 400).send({message:err.message});
    }
}

module.exports = checkJwt;