// src/components/AdminDashboard.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import CandidateForm from "./CandidateForm";


// CreateElection Component

const CreateElection = ({ onSaveAndNext }) => {
  const [electionTitle, setElectionTitle] = useState("");
  const [positionName, setPositionName] = useState("");
  const [amountOfCandidates, setAmountOfCandidates] = useState("");
  const [votingDuration, setVotingDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [candidateForms, setCandidateForms] = useState([]);

  const handleVotingDurationChange = (event) => {
    setVotingDuration(event.target.value);
  };


  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  // Function to calculate the difference between start time and end time
  const calculateTimeDifference = () => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const currentTime = new Date() ; 
      const timeDifference = end - start;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (timeDifference <= 0 || start < currentTime)
      {
        // need to add "SaveAndNext" sate/logic  to deactive it
        return "Error in the time selection"
      }
      else
      return "Duration : " + `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    return "";
  };

  const handleSaveAndNext = () => {
     


    const electionData = {
      electionTitle,
      positionName,
      amountOfCandidates,
      votingDuration,
      startTime,
      candidates: [],
    };

    const forms = [];
    for (let i = 1; i <= 1; i++) {
      forms.push(<CandidateForm key={i} candidateNumber={i} />);
      electionData.candidates.push({
        name: "",
        semester: "",
        id: "",
        cgpa: "",
        motto:"",
        photo: "",
      });
    }

    setCandidateForms(forms);

    // Call the onSaveAndNext function with the electionData
    onSaveAndNext(electionData);

    

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
      <h2>Election Information</h2>
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
          <label>Starting Time:</label> 
          <input
            type="datetime-local"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>

        <div>
          <label>Ending Time:</label> 
          <input
            type="datetime-local"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>



        <div>
           {calculateTimeDifference()}
        </div>
        
        <button type="button" onClick={handleSaveAndNext}>
          Save and Next
        </button>
      </form>

      {candidateForms}
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
  const [pendingRegistrations, setPendingRegistrations] = useState([]);

  // Replace this with actual logic to fetch pending registrations from the server
  // For demonstration purposes, we are using a sample array
  

  const handleApproval = (id) => {
    // Add your logic to approve the registration with the given ID
    // You may need to make an API call to update the status on the server
    // For this example, we will simply remove the registration from the list
    setPendingRegistrations((prevRegistrations) =>
      prevRegistrations.filter((reg) => reg.id !== id)
    );
  };

  // pros driling 

  return (
    <div className="adminDiv">
    
      <h2>Admin Dashboard</h2>
    
      <ul className="adminUl">
          
          <li className="currentElections" >
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
         <CreateElectionDropdown/> 
          </li>

   </ul>
    
     
    </div>
  );
};

export default AdminDashboard;