import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

const CandidateList = ({ positionId, candidates, selectedCandidate, onSelectCandidate }) => (
  <div>
    {candidates.map((candidate) => (
      <div key={candidate._id} className="candidate">
        <img src={candidate.photo} alt={candidate.name} className="candidate-photo" />
        <div className="candidate-info">
          <h3>{candidate.name}</h3>
          <p>ID: {candidate.id}</p>
          <p>Motto: {candidate.motto}</p>
        </div>
        <label>
          <input
            type="radio"
            name={`position_${positionId}`}
            value={candidate._id}
            checked={selectedCandidate === candidate._id}
            onChange={() => onSelectCandidate(positionId, candidate._id)}
          />
          Vote
        </label>
      </div>
    ))}
  </div>
);





const sampleData = {
  title: 'Sample Election',
  positions: [
    {
      _id: 'position1',
      name: 'President',
      candidates: [
        {
          _id: 'candidate1',
          name: 'Kazi Suuny',
          id: '123456',
          motto: 'Vote for a better future',
          photo: 'https://scontent.fdac135-1.fna.fbcdn.net/v/t39.30808-6/343990070_967836087748747_6649146319590324568_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFDz-AM5Tg4G-E4p-fWnXpsjsF2rg5EImSOwXauDkQiZIX-LjyvtxSmCNU1oXGlLXvywoUdrpYYUh04I2VgQ7mr&_nc_ohc=gHpkch73i5YAX9JhRA-&_nc_ht=scontent.fdac135-1.fna&oh=00_AfCtJo4_G5GJvVZGZJiwaWbKHDIcNXJslMbq4TYLf8U1Xg&oe=64E50D6D', 
        },
        {
          _id: 'candidate2',
          name: 'Samiha Jeba',
          id: '654321',
          motto: 'Together we can make a difference',
          photo: 'https://scontent.fdac135-1.fna.fbcdn.net/v/t39.30808-6/342499600_2368984659936847_5811475968911386302_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEPQnw80BaOKYsBWC05s_leVlJMt7onJZJWUky3uiclkpsN0bEvRYQqbtvswHLYNT9gsntX2Bfvjq7g-JJP1g3H&_nc_ohc=mENS-qjEoVMAX_QtqMI&_nc_ht=scontent.fdac135-1.fna&oh=00_AfD7e5y8W5lE6aTpZXo4PNaJh13Fv5pz1cfxOCUZuLywZg&oe=64D1EC89', 
        },
      ],
    },
    {
      _id: 'position2',
      name: 'Vice President',
      candidates: [
        {
          _id: 'candidate3',
          name: 'Israt Mim',
          id: '789012',
          motto: 'Vote for progress',
          photo: 'https://scontent.fdac135-1.fna.fbcdn.net/v/t39.30808-6/355865078_824931845723764_8552054937243491595_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&cb=99be929b-3346023f&ccb=1-7&_nc_sid=174925&_nc_eui2=AeHx_mwJMk9uqlk6OJA1VOVbGR33dC9m0PEZHfd0L2bQ8Z-NtvmWZA3nUboRYBSeKz0oTfvXE_rAWRJQ-2cpeOrM&_nc_ohc=WYNBMA6Eq2cAX-go3tZ&_nc_ht=scontent.fdac135-1.fna&oh=00_AfAOL7EFfPVXdUqjOZ1Y1-PtX_iWcxgKIz5FWa85xfiGBg&oe=64D24E76', 
        },
        {
          _id: 'candidate4',
          name: 'Sunny Kazi',
          id: '908172',
          motto: 'Building a brighter future',
          photo: 'https://scontent.fdac135-1.fna.fbcdn.net/v/t39.30808-6/361306572_2436563126503773_7059122074659330748_n.jpg?_nc_cat=100&cb=99be929b-3346023f&ccb=1-7&_nc_sid=174925&_nc_eui2=AeH5gQazn5GKv80ORKkiZpbOh0LLuvHEYnWHQsu68cRideeS9_vVawLALmlDpxdmMsOsHLow5GljpE19Q0jMCNQL&_nc_ohc=nIMMaNQGGtgAX-Sq_L1&_nc_ht=scontent.fdac135-1.fna&oh=00_AfBFE6Ky1fzVr3Q7X8pQoc_1Xc2wBTjXaoSqeNsMDWm8Yw&oe=64D2C1E1',
        },
      ],
    },
  ],
  endTime: new Date('2023-08-19T18:00:00Z').toISOString(), // Replace with actual end time
};



const VotingPage = () => {

  // student ID from stduent deshbord
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get('studentId');

  const [election, setElection] = useState();
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [timer, setTimer] = useState(null);

  console.log("Student ID :", studentId) ;

  useEffect(() => {
    
    // Simulating fetching data from MongoDB
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VOTE}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setElection(data[0]); // Assuming the response is an array of elections
       
       
        // Calculate remaining time based on endTime
      {/*  const endTime = new Date(data[0].endTime).getTime();
        const now = new Date().getTime();
        const timeRemaining = endTime - now;
        setTimer(timeRemaining); // Initialize the countdown timer
         // Update the timer every second
         const intervalId = setInterval(() => {
          setTimer(prevTime => Math.max(0, prevTime - 1000));
        }, 1000);

        // Clear the interval when the component unmounts
       
      return () => clearInterval(intervalId); */}

      } catch (error) {
        console.error('Error fetching election data:', error);
      }
    };
    

    fetchData();

  }, []);


  

  
  console.log("election : ", election);


  // Function to handle radio button selection
  const handleSelectCandidate = (positionId, candidateId) => {
    setSelectedCandidates((prevSelected) => ({
      ...prevSelected,
      [positionId]: candidateId,
    }));
  };

  // Function to submit votes
  const handleSubmitVotes = async () => {
    if (!election || !selectedCandidates || !studentId) {
      console.error('No election or selected candidates');
      return;
    }

    try {
      // Create an array to hold the IDs of candidates that received votes
      const votedCandidateIds = Object.values(selectedCandidates);
  
      // Send the voted candidate IDs to the server
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.VOTE}/${election._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          votedCandidateIds,
          studentId,
        }),
      });
  
      if (response.ok) {
        // Votes submitted successfully
        // You can update the local state if needed
      } else {
        console.error('Failed to update election data');
      }
    } catch (error) {
      console.error('Error submitting votes:', error);
    }
  };
  

  

  // Render the voting page components
  return (
    <div className="voting-page">
      <h1>E-vote</h1>
      {election && (
        <div className="election-info">
          <h1>{election.electionTitle}</h1>
          <CountdownTimer timeRemaining={timer} />
        </div>
      )}

      {election && election.positions.map((position) => (
        <div key={position._id} className="position">
          <h2>{position.positionName}</h2>
          <CandidateList
           positionId={position._id}
           candidates={position.candidates}
           selectedCandidate={selectedCandidates[position._id]}
           onSelectCandidate={(positionId, candidateId) =>
             handleSelectCandidate(positionId, candidateId)
            }
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
