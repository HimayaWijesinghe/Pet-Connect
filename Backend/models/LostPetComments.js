const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//lostPetSchema Schema
const lostPetComSchema = new Schema({
    comId: Number,
    petId: Number,
    email: String,
    description: String,
    date: { type: Date, default: Date.now },
});

const lostPetCom = mongoose.model('LostPetComment',lostPetComSchema);

module.exports = lostPetCom;