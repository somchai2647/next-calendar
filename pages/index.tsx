import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import { api } from "../libs";
// import useSWR from "swr";
import axios from "axios";

type Props = {};

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function index({}: Props) {
  const [skipMonth, setSkipMonth] = useState(0);

  //useSWR
  // const { data, error } = useSWR("/api/calendar", fetcher);

  async function getCalendar() {
    const res = await axios.get("/api/calendar");
    console.log("=>", await res.data);
  }

  function nextMonth() {
    setSkipMonth(skipMonth + 1);
  }

  function prevMonth() {
    setSkipMonth(skipMonth - 1);
  }

  function nowMonth() {
    setSkipMonth(0);
  }

  return (
    <div>
      <button onClick={getCalendar}>Click</button>
      <button onClick={prevMonth}>-</button>
      <button onClick={nowMonth}>now</button>
      <button onClick={nextMonth}>+</button>
      {skipMonth}
      <Calendar skipMonth={skipMonth} />
    </div>
  );
}
