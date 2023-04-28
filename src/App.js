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
    return <p>{timer}</p>
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

const FinalReport = () => {
  return <p>Congrats! You worked XXX today</p>;
}


// const LogTable = ({logs}) => {}

function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [started, setStarted] = useState(false);

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
  

  // const [logs, setLogs] = useState([])
  // const [totalWorkedTime, setTotalWorkedTime] = useState(0)
  // const [totalBreakTime, setTotalBreakTime] = useState(0)

  // --------------------------------------------------
  // METHODS
  // --------------------------------------------------

  const startWork = () => {
    setIsWorking(true);
    setStarted(true);

    setShowIsWorking(true);
    setShowButtonStartWork(false);
    setShowButtonTakeBreakResumeWorking(true);
    setShowButtonFinishDay(true);
  };

  const changeState = () => {
    setIsWorking(!isWorking);
    setTimer(0)
  }

  const finishDay = () => {
    setStarted(false);
    setShowButtonTakeBreakResumeWorking(false);
    setShowButtonFinishDay(false);
    setShowIsWorking(false);
    setShowFinalReport(true);
  }

  return (
    <div className="App">
      {showIsWorking && <Header isWorking={isWorking} />}
      {showButtonStartWork && <ButtonStartWork startWork={startWork} isWorking={isWorking} />}
      {started && <Timer timer={timer}/>}
      {showButtonTakeBreakResumeWorking && <ButtonTakeBreakResumeWorking isWorking={isWorking} changeState={changeState}/>}
      {showButtonFinishDay && <ButtonFinishDay finishDay={finishDay}/>}
      {showFinalReport && <FinalReport />}

      {/* <Timer /> */}

      {/* <Button_FinishDay />
      <LogTable />  */}
    </div>
  );
}

export default App;
