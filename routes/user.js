var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var checkJwt = require('../modules/checkJWT');

const secretkey = process.env.SECRETKEY ? process.env.SECRETKEY : 'SECRETKEY';

router.post('/register', async(req, res)=>{
    try {
        const search = await User.findOne({email: req.body.email});
        if(search){
            throw {
                status: 400,
                message: 'Email already in use'
            }
        }
        req.body.password = await bcrypt.hash(req.body.password,8);
        await User.create(req.body);
        res.send({message:"Succesfull registration"});
    } catch (err) {
        res.status(400).send({message:err.message});
    }
});

router.post('/login', async(req,res) => {
    try {
        if(!req.body.email || !req.body.password){
            throw {
                status: 400,
                message: 'Bad request'
            }
        }
        const search = await User.findOne({where: {email: req.body.email}});
        if(!search){
            throw {
                status: 401,
                message: 'User with provided email not found!'
            }
        }
        const checkPw = await bcrypt.compare(req.body.password, search.dataValues.password);
        if(!checkPw){
            throw {
                status: 401,
                message: 'Wrong password'
            }
        }
        const token = await jwt.sign({email: req.body.email, id: search.dataValues._id}, secretkey);
        await search.update({jwt: token});
        res.send({token: token});
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

router.use(checkJwt);

router.get('/check-auth', (req,res)=>{
    res.send();
});

router.get('/logout', async(req, res)=> {
    try {
        const search = await User.findByPk(req.payload.id);
        await search.update({jwt: null});
        res.send();
    } catch (err) {
        res.status(400).send({message: err.message});
    }
})


module.exports = router;