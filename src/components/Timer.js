import { formatTime } from '../utils';

const Timer = ({ timer }) => {
    const formattedTime = formatTime(timer);
    return <p>{formattedTime}</p>
  }
export default Timer