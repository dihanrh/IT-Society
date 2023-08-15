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


const electonSampleA = 
{
  election1 : 
 {
  electionTitle: "Electiion Title Test",
  positionName: "Position Name Test",
  amountOfCandidates: 0,
  startTime: {
    "$date": "2023-08-14T17:33:00.000Z"
  },
  endTime: {
    "$date": "2023-08-15T17:33:00.000Z"
  },
  votingDuration: "1 hour",
  isRunning: true,
  candidates: [
    {
      name: "Test One",
      id: "20201",
      semester: "5",
      cgpa: "3",
      motto: "hello one",
      photo: "ok",
      voteCounter: 0,
    
    },
    {
      name: "Test Two",
      id: "20202",
      semester: "4",
      cgpa: "3.5",
      motto: "hello two",
      photo: "ok",
      voteCounter: 0,
      
    },
    
  ],
 },

 election2 : 
 {
  electionTitle: "Electiion Title Test",
  positionName: "Position Name Test",
  amountOfCandidates: 0,
  startTime: {
    "$date": "2023-08-14T17:33:00.000Z"
  },
  endTime: {
    "$date": "2023-08-15T17:33:00.000Z"
  },
  votingDuration: "1 hour",
  isRunning: true,
  candidates: [
    {
      name: "Test One",
      id: "20201",
      semester: "5",
      cgpa: "3",
      motto: "hello one",
      photo: "ok",
      voteCounter: 0,
    
    },
    {
      name: "Test Two",
      id: "20202",
      semester: "4",
      cgpa: "3.5",
      motto: "hello two",
      photo: "ok",
      voteCounter: 0,
      
    },
    
  ],
 },
};


const electonSample = 
{
  electionTitle: "Electiion Title Test",
  positionName: "Position Name Test",
  amountOfCandidates: 0,
  startTime: {
    "$date": "2023-08-14T17:33:00.000Z"
  },
  endTime: {
    "$date": "2023-08-15T17:33:00.000Z"
  },
  votingDuration: "1 hour",
  isRunning: true,
  candidates: [
    {
      name: "Test One",
      id: "20201",
      semester: "5",
      cgpa: "3",
      motto: "hello one",
      photo: "ok",
      voteCounter: 0,
    
    },
    {
      name: "Test Two",
      id: "20202",
      semester: "4",
      cgpa: "3.5",
      motto: "hello two",
      photo: "ok",
      voteCounter: 0,
      
    },
    
  ],
};








const CandidateList = ({ candidates, selectedCandidates, onSelectCandidate, election }) => (
  <div>
    {candidates.map((candidate) => (
      <div key={candidate.id} className="candidate">
        <img src={candidate.photo} alt={candidate.name} className="candidate-photo" />
        <div className="candidate-info">
          <h3>{candidate.name}</h3>
          <p>ID: {candidate.id}</p>
          <p>Motto: {candidate.motto}</p>
        </div>
        <label className='voteButton'>
          <input
            type="checkbox"
            name={`candidate_${candidate.id}`}
            checked={selectedCandidates.includes(candidate.id)}
            onChange={() => onSelectCandidate(candidate.id)}
          />
          Vote
        </label>
      </div>
    ))}
  </div>
);

const VotingPage = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);

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
        setSelectedElection(data[1]); // Display the first election by default
      } catch (error) {
        console.error('Error fetching election data:', error);
      }
    };

    fetchData();
  }, []);

  console.log("Selected Election : ", selectedElection);

  const handleVote = (candidateId) => {
    // Simulating the vote submission process
    // You can send the vote to your backend here
    console.log(`Voted for candidate with ID: ${candidateId}`);
  };

  return (
    <div>
      {selectedElection ? (
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
        </div>
      ) : (
        <p>Loading election data...</p>
      )}
    </div>
  );
};
export default VotingPage;

