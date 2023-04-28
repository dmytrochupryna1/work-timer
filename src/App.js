// import './App.css';
import React, { useState } from 'react'

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
// COMPONENTS
// --------------------------------------------------

const Header = ({isWorking}) => {

  return(
    <header className='App-header'>
      <h1>{ isWorking ? "Working" : "Not Working" }</h1>
    </header>
  )
}

// --------------------------------------------------
const Button_StartWork = ({startWork, setIsWorking }) => {

  return(
    <button
      onClick={startWork}
    >
      Start Work
      </button>
  )

}




// const Timer = () => {}
// const Button_TakeBreak_ResumeWorking = () => {}
// const Button_FinishDay = () => {}
// const LogTable = ({logs}) => {}

function App() {

  const [isWorking, setIsWorking] = useState(false)
  const [logs, setLogs] = useState([])
  const [totalWorkedTime, setTotalWorkedTime] = useState(0)
  const [totalBreakTime, setTotalBreakTime] = useState(0)

  const startWork = () => {
    setIsWorking(true)
  }
  const takeBreak = () => {}
  const resumeWork = () => {}
  const finishDay = () => {}

  return (
    <div className="App">
      <Header isWorking={isWorking}/>
      <Button_StartWork startWork={startWork} isWorking={isWorking}/>

      {/* <Timer /> */}

      {/* <Button_TakeBreak_ResumeWorking />
      <Button_FinishDay />
      <LogTable /> */}
    </div>
  );
}

export default App;
