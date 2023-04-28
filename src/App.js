import React, { useState, useEffect } from "react";
import { formatTime, formatTimeForTable, getCurrentTime } from './utils';
import Header from './components/Header';
import ButtonStartWork from './components/ButtonStartWork';
import Timer from './components/Timer';
import ButtonTakeBreakResumeWorking from './components/ButtonTakeBreakResumeWorking';
import ButtonFinishDay from './components/ButtonFinishDay';
import FinalReport from './components/FinalReport';
import LogTable from './components/LogTable';

function App() {
  const [appState, setAppState] = useState("idle");
  const [isWorking, setIsWorking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [logs, setLogs] = useState([]);
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

  const logEvent = (type) => {
    const startedAt = getCurrentTime();
    const duration = formatTimeForTable(timer);
    setLogs((prevLogs) => [...prevLogs, { startedAt, type, duration }]);
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
  };

  const finishDay = () => {
    logEvent(isWorking ? "work" : "break");
    setAppState("finished");
  };

  return (
    <React.Fragment>
      {(appState === "working" || appState === "onBreak") && <Header isWorking={isWorking} />}
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
