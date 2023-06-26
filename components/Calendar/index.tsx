import React, { useState } from "react";
import MainCalendar from "./MainCalendar";
import FormEvent from "./FormEvent";
import { CallBackDate } from "./interface";
import useSWR from "swr";
type Props = {
  skipMonth?: number;
};

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Calendar({ skipMonth = 0 }: Props) {
  const [page, setPage] = useState(1);
  const [currentDate, setCurrentDate] = useState({});

  const { data: events, mutate , error } = useSWR("/api/calendar", fetcher);

  function handleClicked(data: CallBackDate) {
    console.log(data);
    setCurrentDate(data);
    setPage(2);
  }

  function handleForm(callback: any) {
    console.log(callback);
    switch (callback.action) {
      case "back":
        setPage(1);
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
      <h2>Calendar 2</h2>
      {page === 1 && (
        <MainCalendar
          data={events}
          skipMonth={skipMonth}
          onClick={handleClicked}
        />
      )}
      {page === 2 && (
        <FormEvent onClick={handleForm} currentDate={currentDate} />
      )}
    </React.Fragment>
  );
}
