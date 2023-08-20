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
    const [isPublish, setIsPublish]  =  useState(null) ;
    const [isActive , setIsActive] =  useState(null) ;
    const[isDisable , setDisable] = useState(null) ;
  
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
  
      fetchCurrentElection();
    }, []);
  
    const handlePublishResult = async () => {
      try {
        // Make a PUT request to update the isRunning status to false
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.RESULT}/${currentElection._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isRunning: false,
          }),
        });
  
        if (response.ok) {
          console.log('Election result published successfully');
          setIsPublish('true') ;
          // need to refresh current election - will try it leter.
        
        } else {
          console.error('Failed to publish election result');
        }
      } catch (error) {
        console.error('Error publishing election result:', error);
      }
    };
    const handleActive = async () => {
      try {
        // Make a PUT request to update the isRunning status to false
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACTIVE}/${currentElection._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isRunning: true,
          }),
        });
  
        if (response.ok) {
          console.log('Election has been activated  successfully');
          setIsActive('true') ;
          // need to refresh current election - will try it leter.
        
        } else {
          console.error('Failed to active election result');
        }
      } catch (error) {
        console.error('Error activating election result:', error);
      }
    };

    const handleDisable = async () => {
      try {
        // Make a PUT request to update the isRunning status to false
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.RESULT}/${currentElection._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isRunning: false,
          }),
        });
  
        if (response.ok) {
          console.log('Election disabled successfully');
          setDisable('true') ;
          // need to refresh current election - will try it leter.
        
        } else {
          console.error('Failed to Disable election ');
        }
      } catch (error) {
        console.error('Error Disableing election ', error);
      }
    };
  
    return (
      <div className="ThisForm">
        <h1>Current Election Details</h1>
        {currentElection && (
          <div>
            <h2>{currentElection.electionTitle}</h2>
            <button onClick={handlePublishResult}>Publish Result</button>
            <button onClick={handleDisable}>Disable</button>
            <button onClick={handleActive}>Active Running</button>

            {isDisable == 'true' &&(
              <div><h1> {currentElection.electionTitle} has been Disabled</h1></div>
            )}
            <p>Start Time: {currentElection.startTime}</p>
            <p>End Time: {currentElection.endTime}</p>
            {isPublish  == null && isActive == 'true'&& (
             <div>
               <h4>  <CountdownTimer timeRemaining={timer} /> </h4>
               <h2>Live Result</h2>
             </div>
            
            )}
               {isPublish  == 'true' &&(
             <div>
               <h2>Result has been Published</h2>
             </div>
            
            )}



           
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
 
  
  
  
  
  
  