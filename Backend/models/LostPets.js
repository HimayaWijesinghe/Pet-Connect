const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//lostPetSchema Schema
const lostPetSchema = new Schema({
    pId: Number,
    name: String,
    email: String,
    location: String,
    age: Number,
    color: String,
    breed: String,
    gender: String,
    type: String,
    story: String,
    image: String,
    date: { type: Date, default: Date.now },
    likes: Number
});

const lostPet = mongoose.model('LostPet',lostPetSchema);

module.exports = lostPet;