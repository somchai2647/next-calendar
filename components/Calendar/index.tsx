import React, { useState } from "react";
import MainCalendar from "./MainCalendar";
import FormEvent from "./FormEvent";
import { CallBackDate } from "./interface";

type Props = {
  currentDate: Date;
  skipMouth?: number;
};

export default function Calendar({ currentDate, skipMouth = 0 }: Props) {
  const [page, setPage] = useState(1);

  function handleClicked(data: CallBackDate) {
    console.log(data);
    setPage(2);
  }

  function handleForm(data: any) {
    console.log(data);
    switch (data.action) {
      case "back":
        setPage(1);
        break;

      default:
        break;
    }
  }

  return (
    <React.Fragment>
      {page === 1 && (
        <MainCalendar
          currentDate={currentDate}
          skipMouth={skipMouth}
          onClick={handleClicked}
        />
      )}
      {page === 2 && <FormEvent onClick={handleForm} />}
    </React.Fragment>
  );
}
