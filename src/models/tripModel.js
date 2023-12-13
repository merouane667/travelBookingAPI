const mongoose = require('mongoose');

const travelClassSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
});

const tripSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  destinationImage: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  travelClasses: {
    type: [travelClassSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
