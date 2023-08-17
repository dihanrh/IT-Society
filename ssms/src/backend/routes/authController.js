const express = require('express');
const bcrypt = require('bcrypt');
const Registration = require('../models/registration');
const Election = require('../models/Election');
const VoteElection = require('../models/VoteElection') ;
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



// Route to create a new election
router.post('/candidates', async (req, res) => {
  console.log("hits to create election authC") ;
  try {
    const newElection = req.body; // Election data from the request body
    const createdElection = await Election.create(newElection);
    res.json(createdElection);
  } catch (error) {
    console.log("hits to catch") ;
    res.status(500).json({ error: 'Failed to create election' });
  }
});

// Route to get all elections
router.get('/candidates', async (req, res) => {
  console.log("hits to get election authC") ;
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch elections' });
  }
});








////////////////// testing VoteElectio /////////////////
// Route to create a new election
router.post('/vote', async (req, res) => {
  console.log("hits to create VoteElection  authC") ;
  try {
    const newElection = req.body; // Election data from the request body
    const createdElection = await VoteElection.create(newElection);
    res.json(createdElection);
  } catch (error) {
    console.log("hits to catch") ;
    res.status(500).json({ error: 'Failed to create election' });
  }
});


router.get('/vote', async (req, res) => {
  console.log("hits to get VoteElection authC") ;
  try {
    const elections = await VoteElection.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch elections' });
  }
});

// Define the route for updating vote counts
router.put('/vote', async (req, res) => {
  console.log("Hits to submit vote authC")
  try {
    const updatedElection = req.body; // Assuming the request body contains the updated election data

    // Loop through the updatedElection to update the voteCounter for each candidate
    for (const position of updatedElection.positions) {
      for (const candidate of position.candidates) {
        try {
          // Find the candidate in your data model
          const existingCandidate = await Candidate.findById(candidate._id);

          if (!existingCandidate) {
            console.error('Candidate not found:', candidate._id);
            continue;
          }

          // Update the vote count
          existingCandidate.voteCounter = (existingCandidate.voteCounter || 0) + candidate.voteCounter;
          await existingCandidate.save();
        } catch (error) {
          console.error('Error updating candidate:', error);
        }
      }
    }

    // For demonstration purposes, log the updated election info
    console.log('Updated election:', updatedElection);

    // Update the election in your data model
    await VoteElection.findByIdAndUpdate(updatedElection._id, updatedElection);

    // Respond with a success message
    res.json({ message: 'Votes submitted successfully' });
  } catch (error) {
    console.error('Error updating election data:', error);
    res.status(500).json({ error: 'An error occurred while updating election data' });
  }
});




module.exports = router;
