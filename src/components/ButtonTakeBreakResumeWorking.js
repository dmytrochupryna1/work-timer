const ButtonTakeBreakResumeWorking = ({ isWorking, changeState }) => {
    return <button onClick={changeState}>{isWorking ? "Take a break" : "Resume working"}</button>;
  };

export default ButtonTakeBreakResumeWorking