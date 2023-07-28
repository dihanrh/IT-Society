import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateElection = () => {
  const [electionTitle, setElectionTitle] = useState("");
  const [positionName, setPositionName] = useState("");
  const [amountOfCandidates, setAmountOfCandidates] = useState("");
  const [votingDuration, setVotingDuration] = useState("");

  const handleVotingDurationChange = (event) => {
    setVotingDuration(event.target.value);
  };

  const handleSaveAndNext = () => {
    // Add validation to check if all text fields are filled before proceeding
    if (electionTitle && positionName && amountOfCandidates && votingDuration) {
      // Save the election information and redirect to the next page
      // For now, let's just console.log the data
      console.log("Election Title:", electionTitle);
      console.log("Position Name:", positionName);
      console.log("Amount of Candidates:", amountOfCandidates);
      console.log("Voting Duration:", votingDuration);

      // Redirect to the next page (Candidate Information Page)
      // Replace "/candidateInformation" with the correct path to the next page
      // For example, if the path for the candidate information page is "/candidate-info", replace it accordingly
      // history.push("/candidateInformation"); // You'll need to import useHistory from react-router-dom to use this
    } else {
      alert("Please fill all the fields before proceeding.");
    }
  };

  return (
    <div>
      <h2>Create Election</h2>
      <form>
        <div>
          <label>Election Title:</label>
          <input
            type="text"
            value={electionTitle}
            onChange={(e) => setElectionTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Position Name:</label>
          <input
            type="text"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
          />
        </div>
        <div>
          <label>Amount of Candidates:</label>
          <input
            type="number"
            value={amountOfCandidates}
            onChange={(e) => setAmountOfCandidates(e.target.value)}
          />
        </div>
        <div>
          <label>Voting Duration:</label>
          <input
            type="text"
            value={votingDuration}
            onChange={handleVotingDurationChange}
          />
          {/* Implement the popup with time selection menu */}
          {/* For now, let's just display the selected value */}
          <div>Selected Duration: {votingDuration}</div>
        </div>
        <button type="button" onClick={handleSaveAndNext}>
          Save and Next
        </button>
      </form>
    </div>
  );
};
// mimmmim
export default CreateElection;
