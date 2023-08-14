// src/components/CandidateForm.js

import React, { useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";

const CandidateForm = () => {
    const [candidates, setCandidates] = useState([]);
    const [candidateName, setCandidateName] = useState("");
    const [candidateId, setCandidateId] = useState("");
    const [currentSemester, setCurrentSemester] = useState("");
    const [currentCGPA, setCurrentCGPA] = useState("");
    const [motto, setMotto] = useState("");
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [isEligible, setIsEligible] = useState(true);
    let  countCandidate  = 0 ;
    const handleChoosePicture = (event) => {
      setSelectedPicture(URL.createObjectURL(event.target.files[0]));
    };
  

    // 1. config api endpoint
    const handleSaveAndProceed = () => {

      countCandidate ++ ;
      console.log("Count : ", countCandidate)

      
      if (candidateName && candidateId && currentSemester && currentCGPA && motto) {
        // Check if the candidate is eligible based on CGPA
        if (parseFloat(currentCGPA) <= 2.56) {
          setIsEligible(false);
          return;
        }
    
        // Save candidate information and proceed
        const newCandidate = {
          name: candidateName,
          id: candidateId,
          semester: currentSemester,
          cgpa: currentCGPA,
          motto: motto,
          picture: selectedPicture,
        };
        

        // Update the list of candidates in the state
        setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);
    
        // Reset input fields and selected picture
        setCandidateName("");
        setCandidateId("");
        setCurrentSemester("");
        setCurrentCGPA("");
        setMotto("");
        setSelectedPicture(null);
      } else {
        alert("Please fill all the fields before proceeding.");
      }
    };
    
  
    return (
      <div className="candidateDiv">
        <h2>Candidate Information</h2>
        {isEligible ? null : (
          <div className="popup">
            <p>Not Eligible Candidate</p>
          </div>
        )}
        <form >
          <div >
            <label>Name:</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </div>
          <div>
            <label>ID:</label>
            <input
              type="text"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
            />
          </div>
          <div>
            <label>Current Semester:</label>
            <input
              type="text"
              value={currentSemester}
              onChange={(e) => setCurrentSemester(e.target.value)}
            />
          </div>
          <div>
            <label>Current CGPA:</label>
            <input
              type="number"
              step="0.01"
              value={currentCGPA}
              onChange={(e) => setCurrentCGPA(e.target.value)}
            />
          </div>
          <div>
            <label>Motto:</label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
            />
          </div>
          <div>
            <label>Choose Picture:</label>
            <input type="file" onChange={handleChoosePicture} />
          </div>
          {selectedPicture && (
            <div>
              <img src={selectedPicture} alt="Selected" width="100" />
            </div>
          )}
          <button type="button" onClick={handleSaveAndProceed}>
            Save and Proceed
          </button>
        </form>
        <div>
          {/* Display the list of candidates */}
          <h3>List of Candidates:</h3>
          <ul>
            {candidates.map((candidate, index) => (
              <li key={index}>
                Serial:{index+1}, <br/>
                Name: {candidate.name},<br/>
                 ID: {candidate.id},<br/>
                  Semester:{" "} {candidate.semester},<br/>
                   CGPA: {candidate.cgpa}, <br/>
                   Motto: {candidate.motto}<br/>
                    Photo: <br/>
                {candidate.picture && (
                  <img src={candidate.picture} alt={candidate.name} width="50" />
                )} <br/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
export default CandidateForm;
