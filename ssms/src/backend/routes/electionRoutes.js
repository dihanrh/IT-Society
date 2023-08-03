const express = require('express');
const router = express.Router();
const Election = require('../models/Election');

// Create a new election
router.post('/elections', async (req, res) => {
  try {
    const election = new Election(req.body);
    await election.save();
    res.status(201).send(election);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all elections
router.get('/elections', async (req, res) => {
  try {
    const elections = await Election.find();
    res.send(elections);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
