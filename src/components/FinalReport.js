import { getTotalWorkedDuration, formatTimeForTable } from "../utils";

const FinalReport = ({ logs }) => {
    const totalWorkedDuration = formatTimeForTable(getTotalWorkedDuration(logs));
    return <p>Worked today: {totalWorkedDuration}</p>;
  };

export default FinalReport