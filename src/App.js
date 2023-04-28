// import './App.css';
import React, { useState, useEffect } from "react";

// import Header from './components/Header'
// import Timer from './components/Timer'

// this app will track the user's worked time and will allow taking breaks
// 1. user enters the website
//     1. there is a button to “start work”
//     2. there is an empty log table with columns “type” (work/break), “time start”, “time end”, “duration”
// 2. user clicks “Start work” to begin working
//     1. button “disappears”
//     2. message “Working”
//     3. timer starts
//     4. button “take a break” appears
//     5. button “finish the day” appears
// 3. user clicks “Take a break”
//     1. message “Not Working”
//     2. timer stops
//     3. a new log into the log table with work type
//     4. button “take a break” changes to “resume working”
//     5. another timer starts
// 4. user clicks “Resume working”
//     1. timer stops
//     2. a new log into the log table for the break type
//     3. another timer starts
// 5. user clicks “Finish work the day”
//     1. timer stops
//     2. log is recorded
//     3. message is changed to “Congrats! You worked {totalWorkedTime} today”


const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hourPart = hours.toString().padStart(2, '0');
  const minutePart = minutes.toString().padStart(2, '0');
  const secondPart = seconds.toString().padStart(2, '0');

  return `${hourPart}:${minutePart}:${secondPart}`;
};

const formatTimeForTable = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hourPart = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
  const minutePart = minutes > 0 ? `${minutes} min${minutes > 1 ? 's' : ''}` : '';
  const secondPart = seconds > 0 ? `${seconds} sec${seconds > 1 ? 's' : ''}` : '';

  const formattedTime = [hourPart, minutePart, secondPart].filter(part => part !== '').join(', ');

  return formattedTime === '' ? '0 secs' : formattedTime;
};


const getTotalWorkedDuration = (logs) => {
  return logs.reduce((total, log) => {
    if (log.type === "work") {
      const durationParts = log.duration.split(', ');
      let durationInSeconds = 0;
      
      durationParts.forEach(part => {
        const [value, unit] = part.split(' ');
        if (unit.startsWith('hour')) {
          durationInSeconds += parseInt(value, 10) * 3600;
        } else if (unit.startsWith('min')) {
          durationInSeconds += parseInt(value, 10) * 60;
        } else if (unit.startsWith('sec')) {
          durationInSeconds += parseInt(value, 10);
        }
      });

      return total + durationInSeconds;
    }
    return total;
  }, 0);
};

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const Header = ({ isWorking }) => {
  return (
    <header className="App-header">
      <h1>{isWorking ? "Working" : "Not Working"}</h1>
    </header>
  );
};
// --------------------------------------------------
// COMPONENT
// --------------------------------------------------
const ButtonStartWork = ({ startWork }) => {
  return <button onClick={startWork}>Start Work</button>;
};

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const Timer = ({ timer }) => {
  const formattedTime = formatTime(timer);
  return <p>{formattedTime}</p>
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const ButtonTakeBreakResumeWorking = ({ isWorking, changeState }) => {
  return <button onClick={changeState}>{isWorking ? "Take a break" : "Resume working"}</button>;
};
// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const ButtonFinishDay = ({ finishDay }) => {
  return <button onClick = {finishDay}>Finish the day</button>;
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const FinalReport = ({ logs }) => {
  const totalWorkedDuration = formatTimeForTable(getTotalWorkedDuration(logs));
  return <p>You worked {totalWorkedDuration} today</p>;
};



// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const LogTable = ({ logs }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Started At</th>
          <th>Type</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <td>{log.startedAt}</td>
            <td>{log.type}</td>
            <td>{log.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
//
//  *** GLOBAL APPLICATION ***
//
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------


function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [started, setStarted] = useState(false);
  const [logs, setLogs] = useState([]);
  const [eventStartTime, setEventStartTime] = useState(null);

useEffect(() => {
  if (started) {
    const id = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
    setIntervalId(id)
  }

  return () => clearInterval(intervalId)
}, [started])

  const [showIsWorking, setShowIsWorking] = useState(false);
  const [showButtonStartWork, setShowButtonStartWork] = useState(true);
  const [showButtonTakeBreakResumeWorking, setShowButtonTakeBreakResumeWorking] = useState(false);
  const [showButtonFinishDay, setShowButtonFinishDay] = useState(false);
  const [showFinalReport, setShowFinalReport] = useState(false);
  const [showLogTable, setShowLogTable] = useState(false);
  

  // const [logs, setLogs] = useState([])
  // const [totalWorkedTime, setTotalWorkedTime] = useState(0)
  // const [totalBreakTime, setTotalBreakTime] = useState(0)



  // --------------------------------------------------
  // METHOD
  // --------------------------------------------------

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  // --------------------------------------------------
  // METHOD
  // --------------------------------------------------


  const logEvent = (type) => {
    const startedAt = getCurrentTime();
    const duration = formatTimeForTable(timer);
    setLogs((prevLogs) => [...prevLogs, { startedAt, type, duration }]);
  };
  
  
  // --------------------------------------------------
  // METHOD
  // --------------------------------------------------


  const startWork = () => {
    setIsWorking(true);
    setStarted(true);
    setEventStartTime(getCurrentTime());
  
    setShowIsWorking(true);
    setShowButtonStartWork(false);
    setShowButtonTakeBreakResumeWorking(true);
    setShowButtonFinishDay(true);
  
  };

  // --------------------------------------------------
  // METHOD
  // --------------------------------------------------


  const changeState = () => {
    logEvent(isWorking ? 'work' : 'break');
    setIsWorking(!isWorking);
    setEventStartTime(timer);
    setTimer(0);

    setShowLogTable(true)
  };

  // --------------------------------------------------
  // METHOD
  // --------------------------------------------------


  const finishDay = () => {
    logEvent(isWorking ? 'work' : 'break');
    setStarted(false);
    setShowButtonTakeBreakResumeWorking(false);
    setShowButtonFinishDay(false);
    setShowIsWorking(false);
    setShowFinalReport(true);
  };

  /// --------------------------------------------------
  // METHOD
  // --------------------------------------------------


   

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return (
    <div className="App">
      {showIsWorking && <Header isWorking={isWorking} />}
      {showButtonStartWork && <ButtonStartWork startWork={startWork} isWorking={isWorking} />}
      {started && <Timer timer={timer}/>}
      {showButtonTakeBreakResumeWorking && <ButtonTakeBreakResumeWorking isWorking={isWorking} changeState={changeState}/>}
      {showButtonFinishDay && <ButtonFinishDay finishDay={finishDay}/>}
      {showFinalReport && <FinalReport logs={logs} />}
      {showLogTable && <LogTable logs={logs} />}
      {/* <Timer /> */}

      {/* <Button_FinishDay />
      <LogTable />  */}
    </div>
  );
}

export default App;
