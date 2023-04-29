import React, { useState, useEffect } from "react";
import { formatTime, formatTimeForTable, getCurrentTime } from './utils';
import Header from './components/Header';
import ButtonStartWork from './components/ButtonStartWork';
import Timer from './components/Timer';
import ButtonTakeBreakResumeWorking from './components/ButtonTakeBreakResumeWorking';
import ButtonFinishDay from './components/ButtonFinishDay';
import FinalReport from './components/FinalReport';
import LogTable from './components/LogTable';
import DateDisplay from './components/DateDisplay';
import axios from "axios";


function App() {
  const [appState, setAppState] = useState("idle");
  const [isWorking, setIsWorking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [logs, setLogs] = useState([]);
  const [workingOn, setWorkingOn] = useState("");
  const [dayFinished, setDayFinished] = useState(false);

  const [showLogTable, setShowLogTable] = useState(false);

  useEffect(() => {
    let intervalId;
    if (appState === "working" || appState === "onBreak") {
      intervalId = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [appState]);

  useEffect(() => {
    if (dayFinished) {
      // send a POST request to the server
      (async () => {
        try {
          const response = await axios.post("http://localhost:4000/api/userSessions", { logs }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("User session saved successfully:", response.data);
        } catch (error) {
          console.error("Error saving user session:", error);
        }
      })();
  
      setDayFinished(false);
    }
  }, [logs, dayFinished]);
  

  const logEvent = (type) => {
    const startedAt = getCurrentTime();
    const duration = formatTimeForTable(timer);
    setLogs((prevLogs) => [...prevLogs, { startedAt, type, workingOn, duration }]);
  };

  const startWork = () => {
    setIsWorking(true);
    setAppState("working");
  };

  const changeState = () => {
    logEvent(isWorking ? "work" : "break");
    setIsWorking(!isWorking);
    setAppState(isWorking ? "onBreak" : "working");
    setTimer(0);
    setShowLogTable(true);
    setWorkingOn("");
  };

  const finishDay = async () => {
    logEvent(isWorking ? "work" : "break");
  
    setAppState("finished");
    setWorkingOn("");
    setDayFinished(true)

  };
  
  
  

  const handleWorkingOnChange = (e) => {
    setWorkingOn(e.target.value);
  }

  return (
    <React.Fragment>
      <DateDisplay />
      {(appState === "working" || appState === "onBreak") && <Header isWorking={isWorking} workingOn={workingOn} handleWorkingOnChange={handleWorkingOnChange}/>}
      {appState === "idle" && <ButtonStartWork startWork={startWork} />}
      {(appState === "working" || appState === "onBreak") && <Timer timer={timer} />}
      {(appState === "working" || appState === "onBreak") && (
        <ButtonTakeBreakResumeWorking isWorking={isWorking} changeState={changeState} />
      )}
      {(appState === "working" || appState === "onBreak") && <ButtonFinishDay finishDay={finishDay} />}
      {appState === "finished" && <FinalReport logs={logs} />}
      {showLogTable && <LogTable logs={logs} />}
    </React.Fragment>
  );
}

export default App;
