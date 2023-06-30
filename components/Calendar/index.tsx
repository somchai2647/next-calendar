import React, { useState } from "react";
import MainCalendar from "./MainCalendar";
import FormEvent from "./FormEvent";
import Timeline from "./Timeline";
import { CallBackDate } from "./interface";
import useSWR from "swr";
type Props = {
  urlFetch?: string;
};

type currentDate = {
  day: number;
  month: number;
  year: number;
}

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Calendar({ urlFetch }: Props) {
  const [page, setPage] = useState(1);
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

  function handleActions(callback: any) {
    console.log(callback);
    switch (callback.action) {
      case "back":
        setPage(1);
        break;
      case "event":
        setPage(2);
        setCurrentDate(callback.data);
        break;
      case "add":
        setPage(3);
        console.log("📦", callback.data);
        setCurrentDate(callback.data);
        break;
      case "save":
        mutate([...events, callback.data], false);
        setPage(1);
        break;

      default:
        break;
    }
  }

  return (
    <React.Fragment>
      {page === 1 && <MainCalendar data={events} onClick={handleActions} />}
      {page === 2 && <Timeline onClick={handleActions} data={events} currentDate={currentDate} />}
      {page === 3 && (
        <FormEvent onClick={handleActions} currentDate={currentDate} />
      )}
    </React.Fragment>
  );
}
