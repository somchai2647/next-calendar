import React, { useState } from "react";
import MainCalendar from "./MainCalendar";
import FormEvent from "./FormEvent";
import { CallBackDate } from "./interface";

type Props = {
  skipMonth?: number;
  data?: any;
};

export default function Calendar({ skipMonth = 0, data = [] }: Props) {
  const [page, setPage] = useState(1);
  const [currentDate, setCurrentDate] = useState({});

  function handleClicked(data: CallBackDate) {
    console.log(data);
    setCurrentDate(data);
    setPage(2);
  }

  function handleForm(data: any) {
    console.log(data);
    switch (data.action) {
      case "back":
        setPage(1);
        break;
      case "save":
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
          data={data}
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
