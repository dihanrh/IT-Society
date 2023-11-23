import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";



  const ElectionResult = () => {
    const [currentElection, setCurrentElection] = useState(null);
  
    useEffect(() => {
      // Fetch current election data from the server
      const fetchCurrentElection = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VOTE}`);
          if (!response.ok) {
            throw new Error('Failed to fetch current election data');
          }
          const data = await response.json();
          setCurrentElection(data[0]); // Set the fetched election data to state
          

        } catch (error) {
          console.error('Error fetching current election:', error);
        }
      };

      fetchCurrentElection();
    }, []);
 
  
    return (
        <div>
          <h1>Election Result</h1>
          {currentElection && (
            <div>
              <h2>{currentElection.electionTitle}</h2>
              
              <p>Start Time: {currentElection.startTime}</p>
              <p>End Time: {currentElection.endTime}</p>
    
              {!currentElection.isRunning ? (
                <div>
                  <h3>Positions and Candidates</h3>
                  {currentElection.positions.map((position) => (
                    <div key={position._id}>
                      <h4>{position.positionName}</h4>
                      <ul>
                        {position.candidates.map((candidate) => (
                          <li key={candidate._id}>
                            {candidate.name} - Votes: {candidate.voteCounter || 0}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
              <h4>Result  has not been Published yet</h4>
              )}
            </div>
          )}
        </div>
      );
    };
    
  
  export default ElectionResult;
 
  
  
  
  
  
  