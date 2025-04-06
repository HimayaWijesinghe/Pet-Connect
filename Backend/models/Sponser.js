const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//sponserSchema Schema
const sponserSchema = new Schema({
    sId: Number,
    pId: Number,
    sponserEmail: String,
    sponserName: String,
    amount: Number,
    sponserDate: { type: Date, default: Date.now },
    message: String
});

const Sponser = mongoose.model('Sponser', sponserSchema);

module.exports = Sponser;