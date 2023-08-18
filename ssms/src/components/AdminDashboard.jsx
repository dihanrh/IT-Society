// src/components/AdminDashboard.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import CandidateForm from "./CandidateForm";
import Test from "./test";


import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";


// CreateElection Component

const CreateElection = () => {
  const [proccedElection, setproccedElection] = useState(null);

  const [electionDetails, setElectionDetails] = useState({
    electionTitle: "",
    amountOfPosition: 0,
    positions: [],
    startTime: new Date(),
    endTime: new Date(),
    isRunning: true,
    voterList :[],
  });

  const handleElectionChange = (field, value) => {
    setElectionDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handlePositionChange = (index, field, value) => {
    const updatedPositions = [...electionDetails.positions];
    updatedPositions[index][field] = value;

    setElectionDetails((prevDetails) => ({
      ...prevDetails,
      positions: updatedPositions,
    }));
  };

  const handleCandidateChange = (positionIndex, candidateIndex, field, value) => {
    const updatedPositions = [...electionDetails.positions];
    updatedPositions[positionIndex].candidates[candidateIndex][field] = value;

    setElectionDetails((prevDetails) => ({
      ...prevDetails,
      positions: updatedPositions,
    }));
  };

  const addPosition = () => {
    setElectionDetails((prevDetails) => ({
      ...prevDetails,
      amountOfPosition: prevDetails.amountOfPosition + 1,
      positions: [...prevDetails.positions, { positionName: "", amountOfCandidates: 0, candidates: [] }],
    }));
  };

  const addCandidate = (positionIndex) => {
    const updatedPositions = [...electionDetails.positions];
    if (updatedPositions[positionIndex].amountOfCandidates < 3) {
      updatedPositions[positionIndex].amountOfCandidates += 1;
      updatedPositions[positionIndex].candidates.push({voteCounter:0,});
      setElectionDetails((prevDetails) => ({
        ...prevDetails,
        positions: updatedPositions,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Election Details:", electionDetails);

    try {
      // Make an API call to store election details
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VOTE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(electionDetails),
      });

      if (response.ok) {
        // alert("Election details stored successfully!");
        setproccedElection('success') ;
      } else {
        console.error("Failed to store election details");
        setproccedElection('error') ;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      {proccedElection == 'success'&& (
        <div><h1>Election has been created successfully</h1>
        
        </div>
      )}

{proccedElection == null && (
        <div>
           <h1>Vote Election Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Election Title:</label>
          <input
            type="text"
            value={electionDetails.electionTitle}
            onChange={(e) => handleElectionChange("electionTitle", e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount of Positions:</label>
          <input
            type="number"
            value={electionDetails.amountOfPosition}
            onChange={(e) => handleElectionChange("amountOfPosition", e.target.value)}
          />
        </div>
        <div>
          <label>Starting Time:</label>
          <input
            type="datetime-local"
            value={electionDetails.startTime}
            onChange={(e) => handleElectionChange("startTime", e.target.value)}
          />
        </div>
        <div>
          <label>Ending Time:</label>
          <input
            type="datetime-local"
            value={electionDetails.endTime}
            onChange={(e) => handleElectionChange("endTime", e.target.value)}
          />
        </div>

        <h2>Positions</h2>
        {electionDetails.positions.map((position, positionIndex) => (
          <div key={positionIndex}>
            <h3>Position {positionIndex + 1}</h3>
            <div>
              <label>Position Name:</label>
              <input
                type="text"
                value={position.positionName}
                onChange={(e) => handlePositionChange(positionIndex, "positionName", e.target.value)}
                required
              />
            </div>
            <div>
              <label>Amount of Candidates:</label>
              <input
                type="number"
                value={position.amountOfCandidates}
                onChange={(e) => handlePositionChange(positionIndex, "amountOfCandidates", e.target.value)}
              />
            </div>

            <h4>Candidates</h4>
            {position.candidates.map((candidate, candidateIndex) => (
              <div key={candidateIndex}>
                <h5>Candidate {candidateIndex + 1}</h5>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={candidate.name || ""}
                    onChange={(e) => handleCandidateChange(positionIndex, candidateIndex, "name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>ID:</label>
                  <input
                    type="text"
                    value={candidate.id || ""}
                    onChange={(e) => handleCandidateChange(positionIndex, candidateIndex, "id", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Current Semester:</label>
                  <input
                    type="text"
                    value={candidate.semester || ""}
                    onChange={(e) => handleCandidateChange(positionIndex, candidateIndex, "semester", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Current CGPA:</label>
                  <input
                    type="text"
                    value={candidate.cgpa || ""}
                    onChange={(e) => handleCandidateChange(positionIndex, candidateIndex, "cgpa", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Motto:</label>
                  <input
                    type="text"
                    value={candidate.motto || ""}
                    onChange={(e) => handleCandidateChange(positionIndex, candidateIndex, "motto", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Photo:</label>
                  <input
                    type="text"
                    value={candidate.photo || ""}
                    onChange={(e) => handleCandidateChange(positionIndex, candidateIndex, "photo", e.target.value)}
                    required
                  />
                </div>
                
                
                {/* Other candidate input fields */}
              </div>
            ))}
            <button type="button" onClick={() => addCandidate(positionIndex)}>
              Add Candidate
            </button>
          </div>
        ))}
        {electionDetails.amountOfPosition < 3 && (
          <button type="button" onClick={addPosition}>
            Add Position
          </button>
        )}
        {electionDetails.amountOfPosition >= 1 && (
          <button type="submit">Proceed</button>
        )}
      </form>
        
        </div>
      )}
     
    </div>
  );
};

// Clicking on "Create Election" will call "CreateElection" component

const CreateElectionDropdown = () => {
  // State to manage the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown">
      {/* CreateElection button */}
      <button onClick={toggleDropdown}>Create Election</button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul>
          <li>
            <CreateElection/>
          </li>
        </ul>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  

   



  return (
    <div>
      <h2>Admin Dashboard</h2>
     <div className="adminU">

     </div>

      <ul className="adminUl">
        <li className="currentElections">
          <Link to="/currentElections">Current Elections</Link>
        </li>
        <li className="disableEVoting">
          <Link to="/disableEVoting">Disable E-Voting</Link>
        </li>
        <li className="publishResult">
          <Link to="/publishResult">Publish Result</Link>
        </li>
      </ul>

      <ul>
        <li className="CreateElectionDropdown">
          <CreateElectionDropdown />
        </li>
       
      </ul>
    </div>
  );
};

export default AdminDashboard;
