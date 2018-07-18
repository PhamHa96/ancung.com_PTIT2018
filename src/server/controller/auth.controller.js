var User = require('../models/user.model');
var crypto = require('crypto');
var jwt = require('../utils/jwt');

var secret = 'thisisasecret';

module.exports = {
    login: login,
    checkAuth: checkAuth,
    getToken: getToken, 
    setTokenSocial: setTokenSocial
}

function login(email, password) {
    var hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

    return User.findOne({
        Email: email,
        Password: hash
    })
        .then(function (user) {
            if (user) {
                return new Promise(function (resolve, reject) {
                    jwt.sign({
                        Email: user.Email
                    }, function (err, token) {
                        if (err) {
                            reject({
                                statusCode: 400,
                                message: err.message
                            });
                        } else {
                            resolve(token);
                        }
                    })
                });

            } else {
                return Promise.reject({
                    statusCode: 400,
                    message: 'Email or password is incorrect'
                });
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function checkAuth(email) {
    //console.log(email);
    return User.findOne({ Email: email.email })
        .then(function (foundUser) {
            if (foundUser) {
                return Promise.resolve(foundUser);
            } else {
                return Promise.reject({
                    message: 'Not Found'
                });
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function getToken(token) {
    // console.log('token ctl: ', token);
     return  new Promise(function (resolve, reject) {
        jwt.verify(
            token
            , function (err, decoded) {
                if (err) {
                    reject({
                        statusCode: 400,
                        message: err.message
                    });
                } else {
                    // decoded
                    // console.log(decoded);
                    const tk =  new Promise(function (resolve, reject) {
                        jwt.sign({
                            Email: decoded.Email,
                            iat: decoded.iat
                        }, function (err, token) {
                            if (err) {
                                reject({
                                    statusCode: 400,
                                    message: err.message
                                });
                            } else {
                                // console.log(token);
                                resolve(token);
                            }
                        })
                    })
                    .then(token => {
                        // console.log(token);
                        resolve(token);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                   

                }
            })
    });
}


function setTokenSocial(email) {
    return new Promise(function (resolve, reject) {
        jwt.sign({
            Email: email
        }, function (err, token) {
            if (err) {
                reject({
                    statusCode: 400,
                    message: err.message
                });
            } else {
                resolve(token);
            }
        })
    });
}