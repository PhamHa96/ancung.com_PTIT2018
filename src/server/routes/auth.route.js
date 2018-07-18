var router = require('express').Router();
var authController = require('../controller/auth.controller');

router.post('/login', login);
router.post('/gettoken', getToken);
router.post('/settokensocial', setTokenSocial);

module.exports = router;

function login(req, res, next) {
    var email = req.body.Email;
    console.log(req.emailUser);
    var password = req.body.Password;

    if (!email) {
        next({
            statusCode: 400,
            message: "Email is required"
        })
    } else if (!password) {
        next({
            statusCode: 400,
            message: "Password is required"
        })
    } else {
        authController.login(email, password)
            .then(function (token) {
                res.send(token)
            })
            .catch(function (err) {
                next(err);
            })
    }
}

function getToken(req, res, next) {
    var token = req.body.token;

    authController.getToken(token)
        .then(function (token) {
            res.send(token)
        })
        .catch(function (err) {
            next(err);
        })
}

function setTokenSocial(req, res, next) {
    var email = req.body.Email;

    authController.setTokenSocial(email)
        .then(function (token) {
            res.send(token)
        })
        .catch(function (err) {
            next(err);
        })
}
