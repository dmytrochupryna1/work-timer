const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    const hourPart = hours.toString().padStart(2, '0');
    const minutePart = minutes.toString().padStart(2, '0');
    const secondPart = seconds.toString().padStart(2, '0');
  
    return `${hourPart}:${minutePart}:${secondPart}`;
};

const formatTimeForTable = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    const hourPart = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const minutePart = minutes > 0 ? `${minutes} min${minutes > 1 ? 's' : ''}` : '';
    const secondPart = seconds > 0 ? `${seconds} sec${seconds > 1 ? 's' : ''}` : '';
  
    const formattedTime = [hourPart, minutePart, secondPart].filter(part => part !== '').join(', ');
  
    return formattedTime === '' ? '0 secs' : formattedTime;
};

const getTotalWorkedDuration = (logs) => {
    return logs.reduce((total, log) => {
      if (log.type === "work") {
        const durationParts = log.duration.split(', ');
        let durationInSeconds = 0;
        
        durationParts.forEach(part => {
          const [value, unit] = part.split(' ');
          if (unit.startsWith('hour')) {
            durationInSeconds += parseInt(value, 10) * 3600;
          } else if (unit.startsWith('min')) {
            durationInSeconds += parseInt(value, 10) * 60;
          } else if (unit.startsWith('sec')) {
            durationInSeconds += parseInt(value, 10);
          }
        });
  
        return total + durationInSeconds;
      }
      return total;
    }, 0);
};

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

export {
    formatTime,
    formatTimeForTable,
    getTotalWorkedDuration,
    getCurrentTime
}