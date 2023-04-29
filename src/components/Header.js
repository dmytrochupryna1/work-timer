const Header = ({ isWorking, workingOn, handleWorkingOnChange }) => {
    return (
      <header className="App-header">
        <h1>{isWorking ? "Working on" : "Taking a break..."}</h1>
        {isWorking && (
        <input
          type="text"
          value={workingOn}
          onChange={handleWorkingOnChange}
          placeholder="what?"
        />
      )}
      </header>
    );
  };

export default Header