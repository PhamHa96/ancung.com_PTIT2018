var User = require('../models/user.model');
var crypto = require('crypto');

var secret = 'thisisasecret';

module.exports = {
    getUsers: getUsers,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    saveTypeFood: saveTypeFood,
    addFriends: acceptFriend,
    getUserByEmail: getUserByEmail,
    finUserByEmail: finUserByEmail,
    updateImage: updateImage,
    sendFriendRequest: sendFriendRequest,
    acceptFriend: acceptFriend,
    getfriend: getfriend
}

function finUserByEmail(email) {
    return User.findOne({Email: email}, { password: 0 })
    .then(function (users) {
        return Promise.resolve(users);
    })
    .catch(function (err) {
        return Promise.reject(err);
    })
}

function createUser(newUser) {
    return User.find({ Email: newUser.Email })
        .then(function (foundUsers) {
            if (foundUsers.length > 0) {
                return Promise.reject({
                    statusCode: 400,
                    message: 'Email is existed'
                });
            } else {
                // ma hoa password
                var hash = crypto.createHmac('sha256', secret)
                    .update(newUser.Password)
                    .digest('hex');

                //console.log(hash)

                newUser.Password = hash;
                var user = new User(newUser);
                return user.save()
                    .then(function (user) {
                        return Promise.resolve(user);
                    })
                    .catch(function (err) {
                        return Promise.reject(err);
                    })
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })

}

function getUsers() {
    return User.find({}, { password: 0 })
        .then(function (users) {
            return Promise.resolve(users);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function updateUser(user) {
    return User.update({ _id: user._id }, user)
        .then(function (raw) {
            return Promise.resolve(user);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function deleteUser(userId) {
    return User.findByIdAndRemove({ _id: userId })
        .then(function (raw) {
            return Promise.resolve();
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function saveTypeFood(typefoodId, userId) {
    //console.log(userId);
    var tfId = { typefoodId };
    return User.update({ _id: userId}, { $addToSet: { TypeFood: tfId } })
        .then(function (raw) {
            return Promise.resolve();
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function acceptFriend(friendId, userId) {
    // var frId = { friendId };
    // var usId = { friendId: userId }
    return User.update({ _id: userId}, { $addToSet: { Friend: friendId } }, { $pull: { SentRequests: friendId } })
        .then(function () {
            console.log('them thanh cong user');   
            User.update({ _id:  friendId}, { $addToSet: { Friend: userId } }, { $pull: { IncommingRequests: userId }} )
                .then(function (raw) {
                    console.log('them thanh cong friend');
                    return Promise.resolve();
                })
                .catch(function (err) {
                    console.log('loi them friend');
                    return Promise.reject();
                })
        })
        .catch(function (err) {
            console.log('loi them user');
            return Promise.reject(err);
        })
}

function sendFriendRequest(friendId, userId) {
    return User.findByIdAndUpdate(userId, { $addToSet: { SentRequests: friendId } })
        .then(function () {
            console.log('send friend request success');
            // return Promise.resolve();
            User.findByIdAndUpdate(friendId, { $addToSet: { IncommingRequests: userId } })
                .then(function (raw) {
                    console.log('them thanh cong friend');
                    return Promise.resolve();
                })
                .catch(function (err) {
                    console.log('loi them friend');
                    return Promise.reject();
                })
        })
        .catch(function (err) {
            console.log('loi them user');
            return Promise.reject(err);
        })

}

function getUserByEmail(userEmail) {
    return User.findOne({ Email : userEmail}, { password: 0 })
        .then(function (users) {
            return Promise.resolve(users);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function updateImage(id, image) {
    return User.findByIdAndUpdate(id , { Image: image })
}

function getfriend(userId) {
    return User.findById(userId).populate('Friend')
    .then(function (user) {
        const friendInfo = user.Friend.toObject();
        return Promise.resolve(friendInfo);
    })
    .catch(function (err) {
        return Promise.reject(err);
    })
}