var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeFoodSchema = new Schema({
    Name: {
        type: String,
        required: true
    }
})    

typeFoodSchema.index({ Name: 'text' });

var TypeFood = mongoose.model('typefood', typeFoodSchema);
module.exports = TypeFood;
