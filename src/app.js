const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const username = 'travelbooking';
const password = 'OQxhh4VD7qechtwzuW8V4pdvYgGxpbWVP4FB6Qk56TfHXlsxDQVLFm34S9fkGS2kbBV8PcWjg5fTACDbvZIiLw==';
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
