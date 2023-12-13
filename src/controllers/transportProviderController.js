const jwt = require('jsonwebtoken');
const TransportProvider = require('../models/transportProviderModel');


exports.getAllTransportProviders = async (req, res) => {
  try {
    // Retrieve all transport providers from the database
    const transportProviders = await TransportProvider.find();

    // Send the response
    res.status(200).json(transportProviders);
  } catch (error) {
    console.error(error);
    // Send the error response
    res.status(500).json({ error: 'Internal server error' });
  }
};
