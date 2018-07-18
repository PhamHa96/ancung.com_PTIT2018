var auth = require('../middle-ware/auth');
var router = require('express').Router();
var typefoodController = require('../controller/typefood.controller');

router.post('/', createTypeFood);
router.get('/', getTypeFood);
router.put('/:id', auth.auth(), updateTypeFood);
router.delete('/:id', auth.auth(), deleteTypeFood);

module.exports = router;

function createTypeFood(req, res, next) {
    var newType = req.body;
    if (!newType.Name) {
        next({
            statusCode: 400,
            message: "Name is required"
        })
    } 
    else {
        typefoodController.createTypeFood(newType)
            .then(function (newType) {
                res.json(newType);
            })
            .catch(function (err) {
                next(err);
            })
    }

}

function getTypeFood(req, res, next) {
    typefoodController.getTypeFood()
    .then(function (type) {
        res.send(type);
    })
    .catch(function (err) {
        next(err);
    })
}

function updateTypeFood(req, res, next) {
    var id = req.params.id;
    var typefood = req.body;
    typefoodController.updateTypeFood(typefood)
        .then(function (type) {
            res.send(type);
        })
        .catch(function (err) {
            next(err);
        })

}

function deleteTypeFood(req, res, next) {
    var id = req.params.id;
    typefoodController.deleteTypeFood(id)
    .then(function () {
        res.send('delete successfully');
    })
    .catch(function (err) {
        next(err);
    })
} 