const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  electionTitle: String,
  positionName: String,
  amountOfCandidates: Number,
  startTime: Date,
  endTime: Date,
  votingDuration: String,
  isRunning : Boolean,
  candidates: [
    {
      name: String,
      id: String,
      semester: String,
      cgpa: String,
      motto: String,
      photo: String,
      voteCounter : Number,
    },
  ],
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
