const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//donationSchema Schema
const donationSchema = new Schema({
    dId: Number,
    donorName: String,
    donorEmail: String,
    amount: Number,
    category: String,
    donationDate: { type: Date, default: Date.now },
    message: String
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;