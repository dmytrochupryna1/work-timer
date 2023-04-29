const LogTable = ({ logs }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Started At</th>
            <th>Type</th>
            <th>Activity</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.startedAt}</td>
              <td>{log.type}</td>
              <td>{log.workingOn}</td>
              <td>{log.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default LogTable