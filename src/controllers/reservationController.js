const Reservation = require('../models/reservationModel');
const Passenger = require('../models/passengerModel');
const { secretKey } = require('../config');
const jwt = require('jsonwebtoken');

exports.getAllReservations = async (req, res) => {
  try {
    // Retrieve all reservations from the database
    const reservations = await Reservation.find();

    // Send the reservations as a JSON response
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.makeAReservation = async (req, res) => {
  try {
    // Get the JWT token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    jwt.verify(token, secretKey, async (err) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      // Token is valid, continue with making the reservation
      const { passengerEmail, tripId, travelClass } = req.body;

      // Validate fields
      if (!passengerEmail || !tripId || !travelClass) {
        return res.status(400).json({ error: 'All fields must be filled out.' });
      }

      // Create a new instance of the Reservation model
      const newReservation = new Reservation({
        passengerEmail,
        tripId,
        class: travelClass,
        bookingDate: new Date(),
      });

      // Save the new Reservation to the database
      await newReservation.save();

      res.status(201).json({ message: 'Reservation made successfully.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        // Handle invalid token
        console.error(err);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
      } else {
        // Access decoded information
        const { email } = decoded;

        // Get the reservationId from the request parameters
        const reservationId = req.params.reservationId;
        console.log(reservationId);

        // Find the reservation in the database
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
          // Reservation not found
          return res.status(404).json({ error: 'Reservation not found' });
        }

        // Fetch passenger information using email
        const passenger = await Passenger.find({email: email});

        if (!passenger) {
          // Passenger not found
          return res.status(404).json({ error: 'Passenger not found' });
        }

        // Check if the user making the request is the owner of the reservation

        if (email !== reservation.passengerEmail) {
          return res.status(403).json({ error: 'Forbidden: You are not the owner of this reservation' });
        }

        // Delete the reservation
        await Reservation.findByIdAndDelete(reservationId);

        res.status(200).json({ message: 'Reservation deleted successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        // Handle invalid token
        console.error(err);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
      } else {
        // Access decoded information
        const { email } = decoded;

        // Find the user in the database based on the email
        const user = await Passenger.findOne({ email });

        if (!user) {
          // User not found
          return res.status(404).json({ error: 'User not found' });
        }

        // Find reservations for the user
        const reservations = await Reservation.find({passengerEmail: email});

        // Respond with the reservations
        res.status(200).json(reservations);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};