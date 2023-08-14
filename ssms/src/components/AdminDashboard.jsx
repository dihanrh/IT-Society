// src/components/AdminDashboard.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import CandidateForm from "./CandidateForm";
import Test from "./test";


import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";


// CreateElection Component

const CreateElection = ({ onSaveAndNext }) => {
  const [electionTitle, setElectionTitle] = useState("");
  const [positionName, setPositionName] = useState("");
  const [amountOfCandidates, setAmountOfCandidates] = useState("");
  const [votingDuration, setVotingDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [candidateForms, setCandidateForms] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNotFilled, setIsNotFilled] = useState(false);
  const forms = [];
 // Function to check if the number of candidates is the same as amountOfCandidates
  //const isCandidateListComplete = candidateForms.length === Number(amountOfCandidates);
  
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
      const currentTime = new Date();
      const timeDifference = end - start;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (timeDifference <= 0 || start < currentTime) {
        // need to add "SaveAndNext" sate/logic  to deactive it
        return "Error in the time selection";
      } else
        return (
          "Duration : " +
          `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        );
    }
    return "";
  };


  const handleSaveAndNext = async  () => {
    setIsSubmitted(true);


    const electionData = {
      electionTitle,
      positionName,
      amountOfCandidates: Number(amountOfCandidates), // Ensure it's a number
      startTime,
      endTime,
      votingDuration,
      candidates: candidateForms.map(form => ({
        name: form.candidateName,
        semester: form.currentSemester,
        id: form.candidateId,
        cgpa: form.currentCGPA,
        motto: form.motto,
        photo: form.selectedPicture,
      })),
    };


   
    forms.push(<CandidateForm />);
      electionData.candidates.push({
        name: "",
        semester: "",
        id: "",
        cgpa: "",
        motto: "",
        photo: "",
      });

      const edata = {
        electionTitle: "Student Council Election",
        positionName: "President",
        amountOfCandidates: 0,
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour
        votingDuration: "1 hour",
        candidates: [{}],
      };

      const candidate = {
        name,
        semester,
        id,
        cgpa,
        motto,
        photo,
      };


     [edata, setElectionDetails] = useState(
      electionData
    );

    const handleCandidateChange = (index, field, value) => {
      const updatedCandidates = [...edata.candidates];
      updatedCandidates[index][field] = value;

      setElectionDetails((prevState) => ({
        ...prevState,
        candidates: updatedCandidates,
      }));
    };

      
  
    setCandidateForms(forms);

    // Call the onSaveAndNext function with the electionData
     onSaveAndNext(electionData);

    // Add validation to check if all text fields are filled before proceeding
    if (electionTitle && positionName && amountOfCandidates && startTime && endTime ) {
    setIsNotFilled(true) ;

      // Redirect to the next page (Candidate Information Page)
      // Replace "/candidateInformation" with the correct path to the next page
      // For example, if the path for the candidate information page is "/candidate-info", replace it accordingly
      // history.push("/candidateInformation"); //  need to import useHistory from react-router-dom to use this
    } else {
      alert("Please fill all the fields before proceeding.");
    }

    
  };

   // Function to handle the API call to store election details
   const handleProceed = async (electionData) => {
    console.log("hits form adminDesh", electionData )

    electionData = {
      electionTitle,
      positionName,
      amountOfCandidates: Number(amountOfCandidates), // Ensure it's a number
      startTime,
      endTime,
      votingDuration,
      candidates : [{}],
    };

  



   
    try {
      if (electionData) {
        // Make an API call to store election details
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CANDIDATES}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(electionData),
        });

        if (response.ok) {
          // Election details stored successfully
          alert("Election details stored successfully!");
          // ... perform any additional actions ...
        } else {
          // Handle error
          console.error("Failed to store election details");
        }
      } else {
        alert("No election data to store.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };




  
    

  return (
    <>
      {isSubmitted ? (
        <div className="ShowElectionInfo">
          <h2>Election Information</h2>
          <p>Election Title: {electionTitle}</p>
          <p>Position Name: {positionName}</p>
          <p>Amount of Candidates: {amountOfCandidates}</p>
          <p>Starting Time :{startTime}</p>
          <p>Ending Time :{endTime}</p>
          <p>Duration : {calculateTimeDifference()}</p>
        </div>
      ) : (
        <div className="InputElectionInfo">
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
            <button type="button" onClick={handleSaveAndNext}>
              Save and Next
            </button>
          </form>
        </div>
      )}

      <div>{candidateForms}</div>
      <div>

         {/* Render "Final Save and Proceed" button if the candidate list is complete */}
    

      </div>

      <div> <button onClick={handleProceed}>Proceed</button></div>
    </>
  );
};

// Clicking on "Create Election" will call "CreateElection" component

const CreateElectionDropdown = ({ setElectionData }) => {
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
            <CreateElection setElectionData={setElectionData} />
          </li>
        </ul>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [electionData, setElectionData] = useState(null); 
  // Replace this with actual logic to fetch pending registrations from the server
  // For demonstration purposes, we are using a sample array



  // 1. config - API endpoint
  const handleApproval = async (id) => {
    try {
      // Make an API call to update the registration status
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTRATIONS}/${id}`, {
        method: "PATCH", // Use PATCH for updating existing data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }), // Update status as needed
      });
  
      if (response.ok) {
        // Registration status updated successfully
        // ... perform any additional actions ...
      } else {
        // Handle error
        console.error("Failed to update registration status");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  
    // Remove the registration from the list 
    setPendingRegistrations((prevRegistrations) =>
      prevRegistrations.filter((reg) => reg.id !== id)
    );
  };


   



  return (
    <div>
      <h2>Admin Dashboard</h2>
     <div className="adminU">

     <li >
  <Link to="/test">TEST</Link>
</li>

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
