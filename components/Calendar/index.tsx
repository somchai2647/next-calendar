import React, { useState } from "react";
import MainCalendar from "./MainCalendar";
import FormEvent from "./FormEvent";
import Timeline from "./Timeline";
import { CallBackDate, calendarData } from "./interface";
import useSWR from "swr";
type Props = {
  urlFetch?: string;
};

type currentDate = {
  day: number;
  month: number;
  year: number;
};

type callback = {
  action: string;
  data?: currentDate;
  payload?: calendarData;
};

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Calendar({ urlFetch }: Props) {
  const [page, setPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [currentDate, setCurrentDate] = useState<currentDate>();

  const {
    data: events,
    mutate,
    error,
  } = useSWR(urlFetch ? urlFetch : `/api/calendar`, fetcher);

  function handleClicked(data: CallBackDate) {
    console.log(data);
    setCurrentDate(data);
    setPage(2);
  }

  function handleActions(callback: callback) {
    //callback
    console.log(callback);
    switch (callback.action) {
      case "back":
        if (editMode) {
          // const target = new Date(
          //   callback.data.year,
          //   callback.data.month,
          //   callback.data.day
          // );
          // setCurrentDate({
          //   day: target.getDate(),
          //   month: target.getMonth(),
          //   year: target.getFullYear(),
          // });
          setEditMode(false);
          setPage(1);
        } else {
          setPage(1);
        }
        break;
      case "event":
        setPage(2);
        setCurrentDate(callback.data);
        break;
      case "add":
        setPage(3);
        setCurrentDate(callback.data);
        break;
      case "save":
        mutate([...events, callback.payload], false);
        setPage(1);
        break;
      case "updated":
        const index = events.findIndex(
          (item: calendarData) => item.id === callback.payload.id
        );
        let newEvents = [...events];

        newEvents[index] = callback.payload;

        mutate(newEvents);

        setPage(1);
        break;
      case "edit":
        setPage(3);
        setCurrentDate(callback.data);
        setEditMode(true);
        break;

      default:
        break;
    }
  }

  return (
    <React.Fragment>
      {page === 1 && <MainCalendar data={events} onClick={handleActions} />}
      {page === 2 && (
        <Timeline
          onClick={handleActions}
          data={events}
          currentDate={currentDate}
        />
      )}
      {page === 3 && (
        <FormEvent
          onClick={handleActions}
          currentDate={currentDate}
          editMode={editMode}
        />
      )}
    </React.Fragment>
  );
}
