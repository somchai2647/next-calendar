import React, { useState } from "react";
import styles from "./MainCalendar.module.sass";
import { CallBackDate } from "../interface";

type Props = {
  currentDate: Date;
  skipMouth?: number;
  onClick?: Function | any | CallBackDate;
};

export default function MainCalendar({
  currentDate,
  skipMouth = 0,
  onClick,
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

  // Get to day
  const today = currentDate.getDate();

  // Get the current month
  const currentMonth = currentDate.getMonth() + skipMouth;

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
          </div>
        ))}
      </div>
    </div>
  );
}
