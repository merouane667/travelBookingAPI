const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const promClient = require('prom-client'); // Add this import

const app = express();
const PORT = process.env.PORT || 3000;

// Create a registry and metrics for Prometheus
const register = new promClient.Registry();

// Create a counter for HTTP requests
const requestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status'],
});

// Register the metric with the Prometheus registry
register.registerMetric(requestCounter);

// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    requestCounter.inc({ method: req.method, status: res.statusCode });
  });
  next();
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/travelBooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
