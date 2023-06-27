import React, { useState, ReactNode } from "react";
import styles from "./Popper.module.sass";
import { calendarData } from "../interface";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/th";
dayjs.extend(localizedFormat);
dayjs.locale("th");

type Props = {
  visible: boolean;
  event?: calendarData;
};

export default function Popper({ visible = false, event }: Props) {
  if (!visible) return null;

  const dateStart = new Date(event.startTimestamp);

  const dayStart = dateStart.getDate();
  const monthStart = dateStart.getMonth() + 2;
  const yearStart = dateStart.getFullYear();

  const hourStart = dateStart.getHours();
  const minuteStart = dateStart.getMinutes();
  const secondStart = dateStart.getSeconds();

  //===============================================

  const dateEnd = new Date(event.endTimestamp);
  dateEnd.setUTCHours(23, 59, 59, 999);

  const dayEnd = dateEnd.getDate();
  const monthEnd = dateEnd.getMonth() + 2;
  const yearEnd = dateEnd.getFullYear();

  const hourEnd = dateEnd.getHours();
  const minuteEnd = dateEnd.getMinutes();
  const secondEnd = dateEnd.getSeconds();

  //===============================================

  let timeStringStart = "";
  let timeStringEnd = "";

  if (event.allDay) {
    timeStringStart = ` ${yearStart}-${monthStart}-${dayStart} `;
    timeStringEnd = ` ${yearEnd}-${monthEnd}-${dayEnd} `;
  } else {
    timeStringStart = ` ${yearStart}-${monthStart}-${dayStart} ${hourStart}:${minuteStart}:${secondStart} `;
    timeStringEnd = ` ${yearEnd}-${monthEnd}-${dayEnd} ${hourEnd}:${minuteEnd}:${secondEnd} `;
  }

  const startDisplay = dayjs(timeStringStart).format(
    event.allDay ? "LL" : "LLLL"
  );
  const endDisplay = dayjs(timeStringEnd).format(event.allDay ? "LL" : "LT");

  const isSameDay = dayjs(timeStringStart).isSame(timeStringEnd, "day");

  const display = isSameDay
    ? `${startDisplay}`
    : `${startDisplay} ถึง ${endDisplay}`;

  return (
    <div className={styles.popper_container}>
      {visible && (
        <div className={styles.popper}>
          <div
            className={styles.eventLine}
            style={{ backgroundColor: event.bgColor }}
          ></div>
          <h1>➡️ {event.title}</h1>
          <p>⏲️ {display}</p>
          <p>
            {event.detail ? maxShowString(event.detail, 200) : "ไม่มีคำอธิบาย"}
          </p>
        </div>
      )}
    </div>
  );
}

export function maxShowString(str: string, max: number) {
  if (str.length > max) {
    return str.slice(0, max) + "...";
  } else {
    return str;
  }
}
