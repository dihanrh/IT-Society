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

const CandidateList = ({ candidates, selectedCandidates, onSelectCandidate }) => (
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
  const [election, setElection] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    async function fetchElection() {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CANDIDATES}`);
        if (response.ok) {
          const election = await response.json();
          setElection(election);
          const endTime = new Date(election.endTime).getTime();
          const now = new Date().getTime();
          const timeRemaining = Math.max(endTime - now, 0);
          setTimer(timeRemaining);
        }
      } catch (error) {
        console.error('Error fetching election data:', error);
      }
    }

    fetchElection();
  }, []);

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidates((prevSelected) => {
      if (prevSelected.includes(candidateId)) {
        return prevSelected.filter((id) => id !== candidateId);
      } else {
        return [...prevSelected, candidateId];
      }
    });
  };

  const handleSubmitVotes = async () => {
    try {
      const response = await fetch('/api/vote/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          electionId: election._id,
          selectedCandidates,
        }),
      });
      if (response.ok) {
        // Handle successful vote submission if needed
      }
    } catch (error) {
      console.error('Error submitting votes:', error);
    }
  };

  return (
    <div className="voting-page">
      <h1>E-vote</h1>
      {election && (
        <div className="election-info">
          <h1>{election.electionTitle}</h1>
          <CountdownTimer timeRemaining={timer} />
        </div>
      )}

      {election && election.candidates && election.candidates.map((position) => (
        <div key={position._id} className="position">
          <h2>{position.positionName}</h2>
          <CandidateList
            candidates={position.candidates}
            selectedCandidates={selectedCandidates}
            onSelectCandidate={handleSelectCandidate}
          />
        </div>
      ))}

      <button onClick={handleSubmitVotes}>
        Submit
      </button>
    </div>
  );
};
export default VotingPage;
