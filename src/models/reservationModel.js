const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  passengerEmail: {
    type: String,
    required: true,
  },
  tripId: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
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

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
