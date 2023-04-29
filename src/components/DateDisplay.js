import React from "react";

const DateDisplay = () => {
  const date = new Date();
  const dayOfTheWeek = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return (
    <div className="date-display">
      {dayOfTheWeek}, {day} {month}
    </div>
  );
};

export default DateDisplay;
