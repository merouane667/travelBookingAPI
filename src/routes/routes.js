const express = require('express');
const authController = require('../controllers/authController');
const transportProviderController = require('../controllers/transportProviderController');
const tripController = require('../controllers/tripController');
const reservationController = require('../controllers/reservationController');
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/getAllTransportProviders', transportProviderController.getAllTransportProviders);
router.get('/getAllTrips', tripController.getAllTrips);
router.get('/getAllReservations', reservationController.getAllReservations); //not needed, has to be deleted
router.post('/makeReservation', reservationController.makeAReservation);
router.delete('/reservations/:reservationId', reservationController.deleteReservation);
router.get('/getUserReservations', reservationController.getUserReservations);

module.exports = router;