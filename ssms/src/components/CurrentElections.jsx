import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";

const CountdownTimer = ({ timeRemaining }) => {
    // Calculate hours, minutes, and seconds from timeRemaining
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
    return (
      <div>
        Time Remaining: {hours}h {minutes}m {seconds}s
      </div>
    );
  };


const CurrentElections = () => {
  const [currentElection, setCurrentElection] = useState(null);
  const [timer, setTimer] = useState(null);


  


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

        // Calculate remaining time based on endTime
        const endTime = new Date(data[0].endTime).getTime();
        const now = new Date().getTime();
        const timeRemaining = endTime - now;
        setTimer(timeRemaining); // Initialize the countdown timer
         // Update the timer every second
         const intervalId = setInterval(() => {
          setTimer(prevTime => Math.max(0, prevTime - 1000));
        }, 1000);

        // Clear the interval when the component unmounts
       
      return () => clearInterval(intervalId);



      } catch (error) {
        console.error('Error fetching current election:', error);
      }
    };
    console.log("Election :", currentElection)
   

    fetchCurrentElection();
  }, []);

  return (
    <div>
      <h1>Current Election Details</h1>
      {currentElection && (
        <div>
          <h2>{currentElection.title}</h2>
          <p>Start Time: {currentElection.startTime}</p>
          <p>End Time: {currentElection.endTime}</p>
          <p> <CountdownTimer timeRemaining={timer} /></p>

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
      )}
    </div>
  );
};


export default CurrentElections;
