const Trip = require('../models/tripModel');

exports.getAllTrips = async (req, res) => {
  try {
    // Fetch all trips from the database
    const trips = await Trip.find();

    // Return the list of trips
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};