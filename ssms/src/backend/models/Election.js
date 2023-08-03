const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  electionTitle: String,
  positionName: String,
  amountOfCandidates: Number,
  votingDuration: String,
  startTime: Date,
  candidates: [
    {
      name: String,
      semester: String,
      id: String,
      cgpa: String,
      motto: String,
      photo: String,
    },
  ],
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
