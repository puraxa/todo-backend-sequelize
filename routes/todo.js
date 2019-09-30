var express = require('express');
var router = express.Router();
var db = require('../modules/database');
var checkId = require('../modules/checkId');

router.get('/', async(req, res) => {
    try {
        const search = await db.Todolist.findAll({where: {user_id: req.payload.id}});
        res.send(search);
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

router.post('/', async(req, res) => {
    try {
        const nesto = await db.Todolist.create({
            name_of_list: req.body.name,
            date_created: new Date(),
            userId: req.payload.id
        });
        res.send();
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

router.get('/:id', checkId, async(req, res) => {
    try {
        const search = await db.Item.findAll({where: {todolist_id: req.params.id}});
        res.send({items: search});
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

router.delete('/:id', checkId, async(req, res) => {
    try {
        await db.Todolist.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send();
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

router.delete('/:id/item/:itemid', checkId, async(req,res) => {
    try {
        await db.Item.destroy({
            where: {
                _id: req.params.itemid
            }
        });
        res.send();
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

router.post('/:id', checkId, async(req,res) => {
    try {
        await db.Item.create({
            dateCreated: new Date(),
            isCompleted: false,
            value: req.body.value,
            todolistId: req.params.id
        });
        res.send();
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

router.patch('/:id/item/:itemid/edit', checkId, async(req, res) => {
    try {
        await db.Item.update(
            {value: req.body.value},
            {where: {id: req.params.itemid}}
        );
        res.send();
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

router.patch('/:id/item/:itemid/complete', checkId, async(req,res) => {
    try {
        const search = await db.Item.findByPk(req.params.itemid);
        const completed = search.dataValues.isCompleted == 0 ? true : false;
        const date = search.dataValues.dateCompleted ? null : new Date();
        await search.update({isCompleted: completed, dateCompleted: date});
        res.send();
    } catch (err) {
        res.status(err.status || 400).send({message: err.message});
    }
});

module.exports = router;