import React, { useState } from "react";
import styles from "./Calendar.module.sass";

type Props = {
  currentDate: Date;
  skipMouth: number;
};

export default function Calendar({ currentDate, skipMouth = 0 }: Props) {
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

  // Get the current date
  //   const currentDate = new Date();

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

  return (
    <div className={styles.calendar}>
      <div className={styles.flexContainer}>
        {weekdays["th"].map((weekday, index) => (
          <div key={index} className={styles.flexItemHeader}>
            {weekday}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div className={styles.flexItem} key={index}>
            .
          </div>
        ))}
        {daysArray.map((day) => (
          <div className={styles.flexItem} key={day + firstDayOfMonth}>
            {day + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
