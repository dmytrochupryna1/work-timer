import { getTotalWorkedDuration, formatTimeForTable } from "../utils";

const FinalReport = ({ logs }) => {
    const totalWorkedDuration = formatTimeForTable(getTotalWorkedDuration(logs));
    return <p>You worked {totalWorkedDuration} today</p>;
  };

export default FinalReport