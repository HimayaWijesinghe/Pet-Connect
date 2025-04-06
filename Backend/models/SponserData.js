const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//sponserSchema Schema
const sponserSchema = new Schema({
    sdId: Number,
    name: String,
    age: Number,
    color: String,
    breed: String,
    gender: String,
    type: String,
    amount: Number,
    sponserDataDate: { type: Date, default: Date.now },
    image: String,
    description: String,
    status: String
});

const SponserData = mongoose.model('SponserData', sponserSchema);

module.exports = SponserData;