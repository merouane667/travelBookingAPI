const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Passenger = require('../models/passengerModel');
const { secretKey } = require('../config');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Check for empty fields
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ error: 'All fields must be filled out.' });
    }

    // Custom validation for firstName
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        return res.status(400).json({ error: 'First name must only contain alphabetical characters.' });
    }

    // Custom validation for lastName
    if (!/^[a-zA-Z]+$/.test(lastName)) {
        return res.status(400).json({ error: 'Last name must only contain alphabetical characters.' });
    }

    // Custom validation for email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Check for unique email and phoneNumber
    const isEmailUnique = await Passenger.findOne({ email });
    const isPhoneNumberUnique = await Passenger.findOne({ phoneNumber });

    if (isEmailUnique) {
        return res.status(400).json({ error: 'Email is already in use.' });
    }

    if (isPhoneNumberUnique) {
        return res.status(400).json({ error: 'Phone number is already in use.' });
    }


    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPassenger = new Passenger({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newPassenger.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Passenger.findOne({ email });

    // Check if the user exists and verify the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create a JWT token
      const token = jwt.sign({ userId: user.passengerId, email: user.email }, secretKey , { expiresIn: '1h' });
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
