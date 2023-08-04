const express = require('express');
const bcrypt = require('bcrypt');
const Registration = require('../models/registration'); 
const router = express.Router();

// Route for user registration
router.post('/registration', async (req, res) => {
  try {
    const { name, studentId, semester, email, password } = req.body;

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




// Update registration approval
router.put('/registration/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      { __v: 1 }, // Set __v to 1 to mark as approved
      { new: true }
    );
    res.status(200).json(updatedRegistration);
  } catch (error) {
    console.error('Error updating registration approval:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
