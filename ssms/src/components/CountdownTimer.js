import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ timeRemaining }) => {
  const [seconds, setSeconds] = useState(Math.floor(timeRemaining / 1000));

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return <div>{formatTime(seconds)}</div>;
};

export default CountdownTimer;
