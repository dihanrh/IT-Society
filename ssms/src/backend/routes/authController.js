const express = require('express');
const bcrypt = require('bcrypt');
const Registration = require('../models/registration');
const router = express.Router();
const mongoose = require('mongoose');

// Route for user registration
router.post('/registration', async (req, res) => {
  try {
    const { name, studentId, semester, email, password, isApproved } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await Registration.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new instance of the Registration model using the form data
    const newRegistration = new Registration({
      name,
      studentId,
      semester,
      email,
      password: hashedPassword,
      isApproved,
    });

    // Save the new registration document to the database
    await newRegistration.save();

    // Send a success response back to the client
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    // Send an error response back to the client
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to fetch pending registrations with isApproved query parameter
router.get('/registration/', async (req, res) => {
  const { isApproved } = req.query;

  try {
    const registrations = await Registration.find({ isApproved: isApproved === 'false' ? false : true });
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Update registration approval
router.put('/registration/:id/', async (req, res) => {
  const { id } = req.params;
  console.log('Received PUT request to approve registration for ID:', id);
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      id, 
      //mongoose.Types.ObjectId(id),
      { isApproved: true }, // Update isApproved to true to mark as approved
      { new: true }
    );
    res.status(200).json(updatedRegistration);
  } catch (error) {
    console.error('Error updating registration approval:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for user login and authentication
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;
    console.log('Received login request for studentId:', studentId);
    // Find the user by studentId
    const user = await Registration.findOne({ studentId });

    // If the user doesn't exist or the password is incorrect, return unauthorized
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the user is approved
    if (!user.isApproved) {
      return res.status(403).json({ message: 'User is not approved. Please wait for approval.' });
    }

    // If everything is valid, send back the user data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
