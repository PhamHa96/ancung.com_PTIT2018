var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quananSchema = new Schema({
    slugUrl: {
        type: String
    },
    TenQuan: {
        type: String,
        required: true
    },
    // TypeFood: {
    //     type: String,
    //     required: true
    // },
    // MinPrices: {
    //     type: String,
    //     required: true
    // },
    // MaxPrices: {
    //     type: String,
    //     required: true
    // },
    TimeStart: {
        type: String,
        required: true
    },
    TimeEnd: {
        type: String,
        required: true
    },
    Address: {
        type: String
    },
    Lat: {
        type: Number,
        required: true
    },
    Lng: {
        type: Number,
        required: true
    },
    Detail: {
        type: String
    },
    Image: {
        type: String
    }
    // Party: {
    //     _id: {
    //         type: String,
    //         required: true
    //     },
    //     Leader: {
    //         type: String,
    //         required: true
    //     },
    //     Title: {
    //         type: String,
    //         required: true
    //     },
    // },
    // Rate: {
    //     type: Number,
    //     required: true
    // }, 
});

quananSchema.index({ TenQuan: 'text' });

var QuanAn = mongoose.model('quanan', quananSchema);
module.exports = QuanAn;
