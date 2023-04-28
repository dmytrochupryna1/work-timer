const Header = ({ isWorking }) => {
    return (
      <header className="App-header">
        <h1>{isWorking ? "Working" : "Not Working"}</h1>
      </header>
    );
  };

export default Header