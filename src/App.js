// import './App.css';
import React, { useState, useEffect } from "react";
import { formatTime, formatTimeForTable, getTotalWorkedDuration, getCurrentTime } from "./utils";







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
