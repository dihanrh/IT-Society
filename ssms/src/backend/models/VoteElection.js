const mongoose = require("mongoose");

const VoteElectionSchema = new mongoose.Schema({
  electionTitle: String,
  amountOfPosition: Number,
  positions: [
    {
      positionName: String,
      amountOfCandidates: Number,
      candidates: [
        {
          name: String,
          id: String,
          semester: String,
          cgpa: String,
          motto: String,
          photo: String,
          voteCounter: Number,
        },
      ],
    },
  ],
  startTime: Date,
  endTime: Date,
  votingDuration: String,
  isRunning: Boolean,
});

const VoteElection = mongoose.model("VoteElection", VoteElectionSchema);

module.exports = VoteElection;
