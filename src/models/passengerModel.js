const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    firstName: String,  
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    createdAt: Date,
    updatedAt: Date,
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;