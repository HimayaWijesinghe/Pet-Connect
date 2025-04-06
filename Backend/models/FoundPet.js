const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//foundPetSchema Schema
const foundPetSchema = new Schema({
    fId: Number,
    email: String,
    phone: String,
    location: String,
    color: String,
    breed: String,
    gender: String,
    type: String,
    description: String,
    image: String,
    date: { type: Date, default: Date.now }
});

const foundPet = mongoose.model('FoundPet',foundPetSchema);

module.exports = foundPet;