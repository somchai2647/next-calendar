import React, { useState } from "react";
import MainCalendar from "./MainCalendar";
import FormEvent from "./FormEvent";

type Props = {
  currentDate: Date;
  skipMouth?: number;
};

export default function Calendar({ currentDate, skipMouth = 0 }: Props) {
  const [page, setPage] = useState(1);

  function handleClicked(data: any) {
    console.log(data);
    setPage(2);
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
      {page === 2 && <FormEvent />}
    </React.Fragment>
  );
}
