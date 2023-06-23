import React, { useState } from "react";
import styles from "./MainCalendar.module.sass";
import { CallBackDate, calendarData } from "../interface";
import dayjs from "dayjs";

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
  const currentMonth = 1 + currentDate.getMonth();

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
    <div className={styles.calendar_wrapper}>
      <ol className={styles.calendar}>
        {weekdays["th"].map((weekday, index) => (
          <li key={index} className={styles.dayName}>
            {weekday}
          </li>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={"emptyDay" + index} />
        ))}
        {daysArray.map((day, index) => {
          return (
            //@ts-ignore
            <li
              className={styles.item}
              key={`dayitem-${day + 1}`}
              onClick={() => handleClick(day + 1)}
            >
              <span
                className={`${styles.numberDay} ${
                  day + 1 === today ? styles.toDay : styles.numberDay
                }`}
              >
                {day + 1}
              </span>

              <div className={styles.events}>
                {/* {checkBetweenDate(dateToTimestamp(
                  day + 1,
                  currentMonth,
                  currentYear
                )) && <>true</>} */}
                <Events
                  data={data}
                  day={day + 1}
                  month={currentMonth}
                  year={currentYear}
                />
                {/* {getStartOfDay(currentDate)} | {getEndOfDay(currentDate)} | */}
                {/* {dateToTimestamp(day + 1, currentMonth, currentYear)} */}
                {/* {dayjs().get("date")} | */}
                {/* {day + 1} | {currentMonth} | {currentYear} | */}
                {/* {dateToTimestamp(day + 1, currentMonth, currentYear)} */}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Events({
  data,
  day,
  month,
  year,
}: {
  data: calendarData[];
  day: number;
  month: number;
  year: number;
}) {
  const startDateDay =
    dayjs(`${year}-${month}-${day}`).startOf("day").unix() * 1000;
  const endDateDay =
    dayjs(`${year}-${month}-${day}`).endOf("day").unix() * 1000;

  const events = data.filter((event: calendarData) => {
    //check between date
    if (
      event.startTimestamp >= startDateDay &&
      event.startTimestamp <= endDateDay
    ) {
      return event;
    }
    if (
      event.endTimestamp >= startDateDay &&
      event.endTimestamp <= endDateDay
    ) {
      return event;
    }
    if (
      event.startTimestamp <= startDateDay &&
      event.endTimestamp >= endDateDay
    ) {
      return event;
    }
  });

  // return endDate

  if (events.length > 3)
    return (
      <div
        className={styles.event}
        // style={{ backgroundColor: event.bgColor }}
      >
        {events.length} กิจกรรม
      </div>
    );

  return events.map((event: calendarData) => (
    <div
      key={event.id}
      className={styles.event}
      style={{ backgroundColor: event.bgColor }}
    >
      {event.title}
    </div>
  ));
}
