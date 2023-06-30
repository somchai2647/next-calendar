import React, { useEffect, useState } from "react";
import { calendarData } from "../interface";
import styles from "./Timeline.module.sass";
import dayjs from "dayjs";

export const thaiMonthNames = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม"
];


type Props = {
  data?: calendarData[];
  onClick?: Function;
  currentDate: {
    day: number;
    month: number;
    year: number;
  };
};

function RenderDivs() {
  const divCount = 24;
  const divs = [];

  for (let i = 0; i < divCount; i++) {
    let text = i < 10 ? `0${i}` : `${i}`;
    divs.push(
      <div key={i} className={styles.dayName}>
        {text}
      </div>
    );
  }

  return divs;
}

export default function Timeline({ onClick, data, currentDate }: Props) {
  const [Events, setEvents] = useState<calendarData[]>([]);

  function handleBack() {
    onClick({ action: "back" });
  }

  function handleAddEvent() {
    onClick({
      action: "add",
      data: {
        day: currentDate.day,
        month: currentDate.month,
        year: currentDate.year,
      },
    });
  }

  useEffect(() => {
    const day = currentDate.day;
    const month = currentDate.month;
    const year = currentDate.year;

    const startDateDay =
      dayjs(`${year}-${month + 1}-${day}`)
        .startOf("day")
        .unix() * 1000;
    const endDateDay =
      dayjs(`${year}-${month + 1}-${day}`)
        .endOf("day")
        .unix() * 1000;

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

    setEvents(events);
  }, []);

  return (
    <>
      <button type="button" onClick={handleBack}>
        Back
      </button>
      <button type="button" onClick={handleAddEvent}>
        Add Event
      </button>
      {/* {JSON.stringify(Events)} */}
      <div className={styles.calendar_wrapper}>
        <div className={styles.header}>
          <div className={styles.titleDate}>วันที่ {currentDate.day} {thaiMonthNames[currentDate.month]} {currentDate.year} </div>
        </div>
        <div className={styles.headerHours}>
          <div className={styles.dayName} style={{ width: "5rem" }}>
            กิจกรรม
          </div>
          <RenderDivs />
        </div>
        {Events.length > 0 ? (
          Events.map((event: calendarData) => (
            <EventItem event={event} key={event.id} />
          ))
        ) : (
          <div className={styles.noEvent}>ไม่มีกิจกรรม</div>
        )}
      </div>
    </>
  );
}

function EventItem({ event }: { event: calendarData }) {
  const startDate = dayjs(event.startTimestamp).format("HH");
  const endDate = dayjs(event.endTimestamp).format("HH");
  const allDay = event.allDay;

  const startSpace = Number(startDate);

  let EmtyArray = [];

  if (!allDay) {
    for (let index = 0; index < startSpace; index++) {
      EmtyArray.push(`space${index}`);
    }
  }

  return (
    <div className={styles.nonResponsive}>
      <div
        className={styles.event}
        // style={{ backgroundColor: event.bgColor }}
      >
        <div className={styles.title} style={{ width: "5rem" }}>
          {maxCharacter(event.title, 50)}
        </div>
        {/* <RenderDivs /> */}
        {EmtyArray.map((item) => (
          <div key={item}></div>
        ))}
        <div>
          <div
            className={allDay ? styles.eventTagAllDay : styles.eventTag}
            style={{
              backgroundColor: event.bgColor,
              width:
                !allDay &&
                `${(Number(endDate) - Number(startDate) + 2) * 48 + 25}px`,
            }}
          >
            <p>{maxCharacter(event.title, 100)}</p>
          </div>
          {/* {JSON.stringify(event)} */}
          {/* {Number(startDate)} {Number(endDate)} */}
        </div>
      </div>
    </div>
  );
}

//function max character then word add ...
export function maxCharacter(text: string, max: number) {
  if (text.length > max) {
    return `${text.substring(0, max)}...`;
  } else {
    return text;
  }
}
