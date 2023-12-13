const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const username = 'travelbooking';
const password = 't96Rnsimax3Iq5wgSlNx8t7s6YFCL5c3yOjdoxS7DrDUIa04WEtSHXAPDjbYHZjsnDOtN6FNDVYSACDbSmKi0w==';
const host = 'travelbooking.mongo.cosmos.azure.com';
const port = '10255';
const database = 'travelBooking';

// Connection String
const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}?ssl=true&retryWrites=false`;

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});