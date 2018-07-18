var QuanAn = require('../models/quanan.model');

module.exports = {
    getQuanAn: getQuanAn,
    createQuanAn: createQuanAn,
    updateQuanAn: updateQuanAn,
    deleteQuanAn: deleteQuanAn,
    getPartyQuanAn: getPartyQuanAn,
    getDetailQuanAn: getDetailQuanAn
}

function createQuanAn(newQuanAn) {
    var quanan = new QuanAn(newQuanAn);
    return quanan.save()
    .then(function (quanan) {
        return Promise.resolve(quanan);
    })
    .catch(function (err) {
        return Promise.reject(err);
    })
}

function getQuanAn() {
    return QuanAn.find()
    .then(function (quanan) {
        return Promise.resolve(quanan);
    })
    .catch(function (err) {
        return Promise.reject(err);
    })
}

function updateQuanAn(quanan) {
    return QuanAn.update({ _id: quanan._id }, quanan)
        .then(function (raw) {
            //console.log(raw);
            return Promise.resolve(quanan);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })

}

function deleteQuanAn(idQuanAn) {
    return QuanAn.remove({ _id: idQuanAn})
        .then(function () {
            return Promise.resolve();
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}


function getPartyQuanAn(idQuanAn){
    console.log(idQuanAn);
    try{
        return QuanAn.findOne({_id: idQuanAn},{party:1, _id:0})
        .then(function (data){        
            return Promise.resolve(data);
        })
        .catch(function (err){
            return Promise.reject(err);
        })
    }catch(err){
        console.log(err);
    }

}

function getDetailQuanAn(idQuanAn){
    console.log(idQuanAn);
    try{
        return QuanAn.findOne({_id: idQuanAn})
        .then(function (data){        
            return Promise.resolve(data);
        })
        .catch(function (err){
            return Promise.reject(err);
        })
    }catch(err){
        console.log(err);
    }

}