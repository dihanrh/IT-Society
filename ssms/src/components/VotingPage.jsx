import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";

const CountdownTimer = ({ timeRemaining }) => {
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const seconds = Math.floor((timeRemaining / 1000) % 60);

  return (
    <div>
      Time Remaining: {hours}h {minutes}m {seconds}s
    </div>
  );
};

const VotingPage = () => {
  const [elections, setElections] = useState([]);
  const [selectedElectionIndex, setSelectedElectionIndex] = useState(0);

  useEffect(() => {
    // Simulating fetching data from MongoDB
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CANDIDATES}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setElections(data); // Assuming the response is an array of elections
      } catch (error) {
        console.error('Error fetching election data:', error);
      }
    };

    fetchData();
  }, []);

  console.log("Selected Election Index: ", selectedElectionIndex);

  const handleVote = (candidateId) => {
    // Simulating the vote submission process
    // You can send the vote to your backend here
    console.log(`Voted for candidate with ID: ${candidateId}`);
  };

  const selectedElection = elections[selectedElectionIndex] || null;

  return (
    <div>
      {elections.length > 0 ? (
        <div>
          <h2>{selectedElection.electionTitle}</h2>
          <h3>{selectedElection.positionName}</h3>
          {selectedElection.candidates.map(candidate => (
            <div key={candidate.id}>
              <h4>{candidate.name}</h4>
              <p>ID: {candidate.id}</p>
              <input
                type="radio"
                name="candidate"
                onChange={() => handleVote(candidate.id)}
              />
            </div>
          ))}
          <button>Submit</button>
          <button
            onClick={() => setSelectedElectionIndex((prevIndex) => prevIndex - 1)}
            disabled={selectedElectionIndex === 0}
          >
            Previous Election
          </button>
          <button
            onClick={() => setSelectedElectionIndex((prevIndex) => prevIndex + 1)}
            disabled={selectedElectionIndex === elections.length - 1}
          >
            Next Election
          </button>
        </div>
      ) : (
        <p>Loading election data...</p>
      )}
    </div>
  );
};
export default VotingPage;
