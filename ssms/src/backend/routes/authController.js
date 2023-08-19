const express = require('express');
const bcrypt = require('bcrypt');
const Registration = require('../models/registration');
const Election = require('../models/Election');
const VoteElection = require('../models/VoteElection') ;
const Course = require("../models/Course");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


// Set up storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage });

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








//////////////////  VoteElection  /////////////////
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
router.put('/vote/:electionId', async (req, res) => {
  try {
    const { electionId } = req.params;
    const { votedCandidateIds, studentId } = req.body;

    const existingElection = await VoteElection.findById(electionId);
    if (!existingElection) {
      return res.status(404).json({ error: 'Election not found' });
    }

    if (studentId) {
      existingElection.voterList.push({ studentId });
    }

    for (const position of existingElection.positions) {
      for (const candidate of position.candidates) {
        if (votedCandidateIds.includes(candidate._id.toString())) {
          // Update the vote count for the voted candidate
          candidate.voteCounter = (candidate.voteCounter || 0) + 1;
        }
      }
    }

    await existingElection.save();

    res.json({ message: 'Votes submitted successfully' });
  } catch (error) {
    console.error('Error updating election data:', error);
    res.status(500).json({ error: 'An error occurred while updating election data' });
  }
});

// PUT route to update the isRunning status of a vote election
router.put('/result/:electionId', async (req, res) => {
  console.log("publish result") ;

  const { electionId } = req.params;
  const { isRunning } = req.body;

  try {
    const updatedElection = await VoteElection.findByIdAndUpdate(
      electionId,
      { $set: { isRunning } },
      { new: true }
    );

    if (!updatedElection) {
      return res.status(404).json({ message: 'Election not found' });
    }

    return res.status(200).json(updatedElection);
  } catch (error) {
    console.error('Error updating election:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
// PUT route to Active the isRunning status of a vote election
router.put('/active/:electionId', async (req, res) => {
  console.log("Active result") ;

  const { electionId } = req.params;
  const { isRunning } = req.body;

  try {
    const updatedElection = await VoteElection.findByIdAndUpdate(
      electionId,
      { $set: { isRunning } },
      { new: true }
    );

    if (!updatedElection) {
      return res.status(404).json({ message: 'Election not found' });
    }

    return res.status(200).json(updatedElection);
  } catch (error) {
    console.error('Error updating election:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to add a new course
router.post("/course", async (req, res) => {
  try {
    const {
      courseName,
      courseCode,
      dateTime,
      roomNumber,
      mentorName,
      mentorPhoneNumber,
    } = req.body;

    const newCourse = new Course({
      courseName,
      courseCode,
      dateTime,
      roomNumber,
      mentorName,
      mentorPhoneNumber,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
});



// GET endpoint to fetch mentoring class schedule data
router.get("/course", async (req, res) => {
  try {
    const mentoringClasses = await Course.find();
    res.json(mentoringClasses);
  } catch (error) {
    console.error("Error fetching mentoring classes:", error);
    res.status(500).json({ error: "Failed to fetch mentoring classes" });
  }
});

// GET route to fetch course routine details by course name
router.get('/routine/:courseName', async (req, res) => {
  const courseName = req.params.courseName;

  try {
    const course = await Course.findOne({ courseName });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return the course routine details
    res.status(200).json({
      courseName: course.courseName,
      courseCode: course.courseCode,
      dateTime: course.dateTime,
      roomNumber: course.roomNumber,
      mentorName: course.mentorName,
      mentorPhoneNumber: course.mentorPhoneNumber,
    });
  } catch (error) {
    console.error('Error fetching course routine:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;
