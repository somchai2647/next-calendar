import React, { useState } from "react";
import styles from "./MainCalendar.module.sass";
import { CallBackDate, calendarData } from "../interface";

type Props = {
  skipMonth?: number;
  onClick?: Function | any | CallBackDate;
  data?: any;
};

export default function MainCalendar({
  skipMonth = 0,
  onClick,
  data = [],
}: Props) {
  // Create an array of weekdays
  const weekdays = {
    en: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    th: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
  };
  const currentDate = new Date();

  // Get to day
  const today = currentDate.getDate();

  // Get the current month
  const currentMonth = currentDate.getMonth();

  // Get the current year
  const currentYear = currentDate.getFullYear();

  // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Generate an array of days in the month
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index);

  function handleClick(day: number) {
    const obj: CallBackDate = {
      day: day,
      month: currentMonth,
      year: currentYear,
    };

    onClick(obj);
  }

  return (
    <div className={styles.calendar}>
      {/* {JSON.stringify(data)} */}
      <div className={styles.flexContainer}>
        {weekdays["th"].map((weekday, index) => (
          <div key={index} className={styles.flexItemHeader}>
            {weekday}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div className={styles.flexItemEmtyDay} key={"emptyDay" + index} />
        ))}
        {daysArray.map((day) => (
          <div
            className={`${styles.flexItem} ${
              day + 1 === today ? styles.itemToday : ""
            }`}
            key={day + firstDayOfMonth}
            onClick={() => handleClick(day + 1)}
          >
            <p>{day + 1}</p>
            <div className={styles.events}>
              <Events
                data={data}
                timestamp={dateToTimestamp(
                  day + 1,
                  currentMonth + 1,
                  currentYear
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function dateToTimestamp(day: number, month: number, year: number) {
  // Create a new Date object with the provided values
  var date = new Date(year, month, day);

  // Get the timestamp value in milliseconds
  var timestamp = date.getTime();

  // Return the timestamp
  return timestamp;
}

function Events({
  data,
  timestamp,
}: {
  data: calendarData[];
  timestamp: number;
}) {
  const events = data.filter((item) => item.startDate === timestamp);

  if (events.length > 3)
    return (
      <>
        <div
          className={styles.event}
          // style={{ backgroundColor: event.bgColor }}
        >
          {events.length} กิจกรรม
        </div>
      </>
    );

  return events.map((event) => (
    <>
      <div
        key={event.id}
        className={styles.event}
        style={{ backgroundColor: event.bgColor }}
      >
        {event.name}
      </div>
    </>
  ));
}

// function hasEvent(data: myData[], timestamp: number) {
//   //timestamp = 1689872400000 is include in data array object

//   const events = data.filter((item) => item.startDate === timestamp);

//   const Event = (e: myData) => (
//     <div
//       key={e.id}
//       className={styles.event}
//       style={{ backgroundColor: e.bgColor }}
//     >
//       {e.name}
//     </div>
//   );

//   return events.map((event) => <Event {...event} />);

//   // if (event)
//   //   return (
//   //
//   //   );

//   // return "";
// }
