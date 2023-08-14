// src/components/test.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleSaveAndNext = async () => {
    setIsSubmitted(true);

    const electionData = {
      electionTitle,
      positionName,
      amountOfCandidates: Number(amountOfCandidates), // Ensure it's a number
      startTime,
      endTime,
      votingDuration,
      candidates: candidateForms.map((form) => ({
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

    setCandidateForms(forms);

    // Call the onSaveAndNext function with the electionData
    onSaveAndNext(electionData);

    // Add validation to check if all text fields are filled before proceeding
    if (
      electionTitle &&
      positionName &&
      amountOfCandidates &&
      startTime &&
      endTime
    ) {
      setIsNotFilled(true);

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
    console.log("hits");

    try {
      if (electionData) {
        // Make an API call to store election details

        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.CANDIDATES}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(electionData),
          }
        );

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

  const CandidateForm = () => {
    const [candidates, setCandidates] = useState([]);
    const [candidateName, setCandidateName] = useState("");
    const [candidateId, setCandidateId] = useState("");
    const [currentSemester, setCurrentSemester] = useState("");
    const [currentCGPA, setCurrentCGPA] = useState("");
    const [motto, setMotto] = useState("");
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [isEligible, setIsEligible] = useState(true);
    let countCandidate = 0;
    const handleChoosePicture = (event) => {
      setSelectedPicture(URL.createObjectURL(event.target.files[0]));
    };

    // 1. config api endpoint
    const handleSaveAndProceed = () => {
      countCandidate++;
      console.log("Count : ", countCandidate);

      if (
        candidateName &&
        candidateId &&
        currentSemester &&
        currentCGPA &&
        motto
      ) {
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
        <form>
          <div>
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
                Serial:{index + 1}, <br />
                Name: {candidate.name},<br />
                ID: {candidate.id},<br />
                Semester: {candidate.semester},<br />
                CGPA: {candidate.cgpa}, <br />
                Motto: {candidate.motto}
                <br />
                Photo: <br />
                {candidate.picture && (
                  <img
                    src={candidate.picture}
                    alt={candidate.name}
                    width="50"
                  />
                )}{" "}
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
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

      <div>
        {" "}
        <button onClick={handleProceed}>Proceed</button>
      </div>
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

const Test = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [electionData, setElectionData] = useState(null);
  // Replace this with actual logic to fetch pending registrations from the server
  // For demonstration purposes, we are using a sample array

  // 1. config - API endpoint
  const handleApproval = async (id) => {
    try {
      // Make an API call to update the registration status
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.REGISTRATIONS}/${id}`,
        {
          method: "PATCH", // Use PATCH for updating existing data
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "approved" }), // Update status as needed
        }
      );

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

  //////////////////////////--Election Test--/////////////////////////////////

  const ElectionDetails = () => {
    const [electionDetails, setElectionDetails] = useState({
      electionTitle: "",
      positionName: "",
      amountOfCandidates: 0,
      startTime: new Date().toISOString().substring(0, 16), // Format: yyyy-MM-ddTHH:mm
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000)
        .toISOString()
        .substring(0, 16), // 1 hour
      votingDuration: "1 hour",
      candidates: [],
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setElectionDetails({
        ...electionDetails,
        [name]: value,
      });
    };

    const handleAddCandidate = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior

      const formData = new FormData(e.target);

      const request = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CANDIDATES}`,
        {
          method: "POST",
          body: formData,
        }
      );

      fetch(request)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((candidate) => {
          setElectionDetails({
            ...electionDetails,
            candidates: [...electionDetails.candidates, candidate],
            amountOfCandidates: electionDetails.amountOfCandidates + 1,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return (
      <div>
        <h1>Election Details</h1>
        <form onSubmit={handleAddCandidate}>
          <input
            type="text"
            placeholder="Election title"
            name="electionTitle"
            value={electionDetails.electionTitle}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Position name"
            name="positionName"
            value={electionDetails.positionName}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Amount of candidates"
            name="amountOfCandidates"
            value={electionDetails.amountOfCandidates}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            placeholder="Start time"
            name="startTime"
            value={electionDetails.startTime}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            placeholder="End time"
            name="endTime"
            value={electionDetails.endTime}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Voting duration"
            name="votingDuration"
            value={electionDetails.votingDuration}
            onChange={handleChange}
          />
          <button type="submit">Add candidate</button>
        </form>
        <ul>
          {electionDetails.candidates.map((candidate, index) => (
            <li key={index}>{candidate.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  //////////////////////////////////////////////////////////

  const ElectionForm = () => {
    const initialElectionDetails = {
      electionTitle: "Student Council Election",
      positionName: "President",
      amountOfCandidates: 0,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour
      votingDuration: "1 hour",
      candidates: [{}],
    };

    const getCandidateDetails = () => {
      const name = candidate.name;
      const semester = candidate.semester;
      const id = candidate.id;
      const cgpa = candidate.cgpa;
      const motto = candidate.motto;
      const photo = candidate.photo;

      const candidate = {
        name,
        semester,
        id,
        cgpa,
        motto,
        photo,
      };

      initialElectionDetails.candidates.push(candidate);
      initialElectionDetails.amountOfCandidates++;
    };

    const addCandidate = () => {
      while (initialElectionDetails.amountOfCandidates < 2) {
        getCandidateDetails();
      }
    };

    const [electionDetails, setElectionDetails] = useState(
      initialElectionDetails
    );

    const handleCandidateChange = (index, field, value) => {
      const updatedCandidates = [...electionDetails.candidates];
      updatedCandidates[index][field] = value;

      setElectionDetails((prevState) => ({
        ...prevState,
        candidates: updatedCandidates,
      }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      // You can perform any further actions with the electionDetails data here
      console.log("Election Details:", electionDetails);

      try {
        if (electionDetails) {
          // Make an API call to store election details

          const response = await fetch(
            `${API_BASE_URL}${API_ENDPOINTS.CANDIDATES}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(electionDetails),
            }
          );

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
      <div>
        <h1>Election Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Render election details fields here */}
          <h2>Candidates</h2>
          {electionDetails.candidates.map((candidate, index) => (
            <div key={index}>
              <h3>Candidate {index + 1}</h3>
              <label>Name:</label>
              <input
                type="text"
                value={candidate.name}
                onChange={(e) =>
                  handleCandidateChange(index, "name", e.target.value)
                }
                required
              />
              <label>Semester:</label>
              <input
                type="text"
                value={candidate.semester}
                onChange={(e) =>
                  handleCandidateChange(index, "semester", e.target.value)
                }
                required
              />
              {/* Other candidate fields */}
            </div>
          ))}
          <button onClick={addCandidate}>Add Candidate</button>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  const ElectionFormA = () => {
    const [electionDetails, setElectionDetails] = useState({
      electionTitle: "",
      positionName: "",
      amountOfCandidates: 0,
      startTime: new Date(),
      endTime: new Date(),
      votingDuration: "1 hour",
      isRunning : true,
      candidates: [],
    });

    const handleElectionChange = (field, value) => {
      setElectionDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    };

    const handleCandidateChange = (index, field, value) => {
      const updatedCandidates = [...electionDetails.candidates];
      updatedCandidates[index][field] = value;

      setElectionDetails((prevDetails) => ({
        ...prevDetails,
        candidates: updatedCandidates,
      }));
    };


    const addCandidate = () => {
      
      if (electionDetails.amountOfCandidates < 2 ) {
        setElectionDetails((prevDetails) => ({
          ...prevDetails,
          amountOfCandidates: prevDetails.amountOfCandidates + 1,
          candidates: [...prevDetails.candidates, {}],
        }));
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Election Details:", electionDetails);
      

      try {
        // Make an API call to store election details
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.CANDIDATES}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(electionDetails),
          }
        );

        if (response.ok) {
          alert("Election details stored successfully!");
        } else {
          console.error("Failed to store election details");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    return (
      <>
        <div>
          <h1>Election Form</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Election Title:</label>
              <input
                type="text"
                value={electionDetails.electionTitle}
                onChange={(e) =>
                  handleElectionChange("electionTitle", e.target.value)
                }
                required
              />
            </div>
            <div>
              <label>Position Name:</label>
              <input
                type="text"
                value={electionDetails.positionName}
                onChange={(e) =>
                  handleElectionChange("positionName", e.target.value)
                }
                required
              />
            </div>

            <div>
              <label>Amount of Candidates:</label>
              <input
                type="number"
                value={electionDetails.amountOfCandidates}
                onChange={(e) =>
                  handleElectionChange("amountOfCandidates", e.target.value)
                }
              />
            </div>
            <div>
              <label>Starting Time:</label>
              <input
                type="datetime-local"
                value={electionDetails.startTime}
                onChange={(e) =>
                  handleElectionChange("startTime", e.target.value)
                }
              />
            </div>

            <div>
              <label>Ending Time:</label>
              <input
                type="datetime-local"
                value={electionDetails.endTime}
                onChange={(e) =>
                  handleElectionChange("endTime", e.target.value)
                }
              />
            </div>
            {/* Other election detail fields */}

            <h2>Candidates</h2>
            {electionDetails.candidates.map((candidate, index) => (
              <div key={index}>
                <h3>Candidate {index + 1}</h3>
               
                <ul>
                  <li>
                    <label>Name:</label>
                    <input
                      type="text"
                      value={candidate.name || ""}
                      onChange={(e) =>
                        handleCandidateChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <label>ID:</label>
                    <input
                      type="text"
                      value={candidate.id || ""}
                      onChange={(e) =>
                        handleCandidateChange(index, "id", e.target.value)
                      }
                      required
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <label>Semester:</label>
                    <input
                      type="text"
                      value={candidate.semester || ""}
                      onChange={(e) =>
                        handleCandidateChange(index, "semester", e.target.value)
                      }
                      required
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <label>CGPA:</label>
                    <input
                      type="text"
                      value={candidate.cgpa || ""}
                      onChange={(e) =>
                        handleCandidateChange(index, "cgpa", e.target.value)
                      }
                      required
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <label>Motto:</label>
                    <input
                      type="text"
                      value={candidate.motto || ""}
                      onChange={(e) =>
                        handleCandidateChange(index, "motto", e.target.value)
                      }
                      required
                    />
                  </li>
                </ul>
                <ul>
                  <li>
                    <label>Photo:</label>
                    <input
                      type="text"
                      value={candidate.photo || ""}
                      onChange={(e) =>
                        handleCandidateChange(index, "photo", e.target.value)
                      }
                      required
                    />
                  </li>
                </ul>
               
                {/* Other candidate fields */}
              </div>
            ))}
            {electionDetails.amountOfCandidates < 2 && (
              <button type="button" onClick={addCandidate}>
                Add Candidate
              </button>
            )}
            {electionDetails.amountOfCandidates === 2 && (
              <button type="submit">Proceed</button>
            )}
          </form>
        </div>
      </>
    );
  };

  return (
    <div>
      <h2>Test</h2>

      <ul>
        <li>
          <ElectionFormA />
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

export default Test;
