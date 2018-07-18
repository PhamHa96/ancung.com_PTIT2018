var Type = require('../models/typefood.model');

module.exports = {
    getTypeFood: getTypeFood,
    createTypeFood: createTypeFood,
    updateTypeFood: updateTypeFood,
    deleteTypeFood: deleteTypeFood
}

function createTypeFood(newType) {
    return Type.find({ Name: newType.Name })
    .then(function (foundTypes) {
        if (foundTypes.length > 0) {
            return Promise.reject({
                statusCode: 400,
                message: 'Type of food is existed'
            });
        } else {
            var type = new Type(newType);
            return type.save()
                .then(function (type) {
                    return Promise.resolve(type);
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

function getTypeFood() {
    return Type.find({})
    .then(function (typefood) {
        return Promise.resolve(typefood);
    })
    .catch(function (err) {
        return Promise.reject(err);
    })
}

function updateTypeFood(typefood) {
    return Type.update({ _id: typefood._id }, typefood)
        .then(function (raw) {
            return Promise.resolve(typefood);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function deleteTypeFood(typefoodId) {
    return Type.findByIdAndRemove({ _id: typefoodId })
    .then(function (raw) {
        return Promise.resolve();
    })
    .catch(function (err) {
        return Promise.reject(err);
    })
}