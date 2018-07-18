var auth = require('../middle-ware/auth');
var router = require('express').Router();
var quananController = require('../controller/quanan.controller');

router.post('/', createQuanAn);
router.get('/', getQuanAn);
router.get('/party/:id', getPartyQuanAn);
router.get('/:id', getDetailQuanAn);
router.put('/:id', auth.auth(), updateQuanAn);
router.delete('/:id', auth.auth(), deleteQuanAn);

module.exports = router;

function createQuanAn(req, res, next) {
    var newQuanAn = req.body;
    if (!newQuanAn.TenQuan) {
        next({
            statusCode: 400,
            message: "name is required"
        })
    } 
    // else if (!newQuanAn.Quan) {
    //     next({
    //         statusCode: 401,
    //         message: "District is required"
    //     })
    // } 
    // else if (!newQuanAn.ThanhPho) {
    //     next({
    //         statusCode: 402,
    //         message: "City is required"
    //     })
    // }
    // else if (!newQuanAn.DatNuoc) {
    //     next({
    //         statusCode: 403,
    //         message: "Country is required"
    //     })
    // } 
    else if (!newQuanAn.Lat) {
        next({
            statusCode: 405,
            message: "iat is required"
        })
    }
    else if (!newQuanAn.Lng) {
        next({
            statusCode: 406,
            message: "ing is required"
        })
    // }
    // else if (!newQuanAn.MaxPrice) {
    //     next({
    //         statusCode: 407,
    //         message: "MaxPrice is required"
    //     })
    // }
    // else if (!newQuanAn.MinPrice) {
    //     next({
    //         statusCode: 408,
    //         message: "MinPrice is required"
    //     })
    // }
    // else if (!newQuanAn.TimeStart) {
    //     next({
    //         statusCode: 409,
    //         message: "TimeStart is required"
    //     })
    // }
    // else if (!newQuanAn.TimeEnd) {
    //     next({
    //         statusCode: 410,
    //         message: "TimeEnd is required"
    //     })
    // }
    // else if (!newQuanAn.Rate) {
    //     next({
    //         statusCode: 411,
    //         message: "Rate is required"
    //     })
    }
    else {
        quananController.createQuanAn(newQuanAn)
            .then(function (quanan) {
                res.json(quanan);
            })
            .catch(function (err) {
                next(err);
            })
    }

}

function getQuanAn(req, res, next) {
    quananController.getQuanAn()
    .then(function (quanan) {
        res.send(quanan);
    })
    .catch(function (err) {
        next(err);
    })
}

function updateQuanAn(req, res, next) {
    var id = req.params.id;
    var quanan = req.body;
    quananController.updateQuanAn(quanan)
        .then(function (quanan) {
            res.send(quanan);
        })
        .catch(function (err) {
            next(err);
        })

}

function deleteQuanAn(req, res, next) {
    var id = req.params.id;
    quananController.deleteQuanAn(id)
    .then(function () {
        res.send('delete successfully');
    })
    .catch(function (err) {
        next(err);
    })
} 

function getPartyQuanAn(req, res, next){
    var id = req.params.id;
    quananController.getPartyQuanAn(id)
    .then(function (data){
        res.send(data);
    })
    .catch(function (err){
        next(err);
    })
}

function getDetailQuanAn(req, res, next){
    var id = req.params.id;
    quananController.getDetailQuanAn(id)
    .then(function (data){
        res.send(data);
    })
    .catch(function (err){
        next(err);
    })
}