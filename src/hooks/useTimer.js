// hooks/useTimer.js
import { useState, useEffect } from 'react';

export const useTimer = (initialState, appState) => {
  const [timer, setTimer] = useState(initialState);

  useEffect(() => {
    let intervalId;
    if (appState === 'working' || appState === 'onBreak') {
      intervalId = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [appState]);

  return [timer, setTimer];
};
