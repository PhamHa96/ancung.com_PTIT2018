var router = require('express').Router();
var auth = require('../middle-ware/auth');
var userController = require('../controller/user.controller');
var User = require('../models/user.model');

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.post('/', createUser);
router.get('/', getUser);
router.put('/:id', auth.auth(), updateUser);
router.delete('/:id', auth.auth(), deleteUser);

router.get('/:email', getUserByEmail);

router.post('/savetypefood/:id', auth.auth(), saveTypeFood);
router.post('/acceptfriend/:id',auth.auth(), acceptFriend);
router.post('/sendFriendRequest/:id',auth.auth(), sendFriendRequest);
router.get('/finduser/:email', finUserByEmail);
router.get('/getfriend/:id', getfriend);

module.exports = router;

function finUserByEmail(req, res, next) {
    var email = req.params.email;
    userController.finUserByEmail(email)
        .then(function (user) {
            res.json(user);
        })
        .catch(function (err) {
            next(err);
        })
}

function createUser(req, res, next) {
    var newUser = req.body;
    if (!newUser.Name) {
        next({
            statusCode: 400,
            message: "Name is required"
        })
    } else if (!newUser.Email) {
        next({
            statusCode: 400,
            message: "Email is required"
        })
    } else if (!newUser.Password) {
        next({
            statusCode: 400,
            message: "Password is required"
        })
    } else {
        userController.createUser(newUser)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (err) {
                next(err);
            })
    }
}

function getUser(req, res, next) {
    userController.getUsers()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            next(err);
        })
}

function updateUser(req, res, next) {
    var id = req.params.id;
    var user = req.body;
    user._id = id;
    userController.updateUser(user)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            next(err);
        })
}

function deleteUser(req, res, next) {
    var id = req.params.id;
    userController.deleteUser(id)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            next(err);
        })
}

function saveTypeFood(req, res, next) {
    var typeId = req.params.id;
    var emailUser = req.emailUser;
    User.findOne({ Email: emailUser })
    .then(user => {
        //console.log(user._id);
        userController.saveTypeFood(typeId, user._id)
        .then(function (type) {
            res.send(type);
        })
        .catch(function (err) {
            next(err);
        })

    })
    .catch(err => {
        console.log(err.message);
    })
}        

function acceptFriend(req, res, next) {
    // accept add friend

    var friendId = req.params.id;
    var emailUser = req.emailUser;
    //console.log(emailUser);
    User.findOne({ Email: emailUser })
    .then(user => {

        userController.acceptFriend(friendId, user._id)
        .then(function (friend) {
            res.send(friend);
        })
        .catch(function (err) {
            next(err);
        })

    })
    .catch(err => {
        console.log(err.message);
    })

    
}

function sendFriendRequest(req, res, next) {
    var friendId = req.params.id;
    var emailUser = req.emailUser;
    // console.log(emailUser);
    User.findOne({ Email: emailUser })
    .then(user => {
        userController.sendFriendRequest(friendId, user._id)
        .then(function (friend) {
            res.send(friend);
        })
        .catch(function (err) {
            next(err);
        })

    })
    .catch(err => {
        console.log(err.message);
    })
}

function getUserByEmail(req, res, next) {
    userEmail = req.params.email;
    userController.getUserByEmail(userEmail)
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            next(err);
        })
}

function getfriend(req, res, next) {
    const userId = req.params.id;
    userController.getfriend(userId)
    .then(function (users) {
        res.send(users);
    })
    .catch(function (err) {
        next(err);
    })
}