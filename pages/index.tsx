import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import { api } from "../libs";
import useSWR from "swr";
import axios from "axios";

type Props = {};

const fetcher = url => fetch(url).then(r => r.json())

export default function index({}: Props) {
  const [skipMouth, setSkipMouth] = useState(0);

  //useSWR
  const { data, error } = useSWR("/api/calendar", fetcher);

  console.log(data)

  async function getCalendar() {
    const res = await axios.get("/api/calendar");
    console.log("=>", await res.data);
  }

  const currentDate = new Date();

  function nextMouth() {
    setSkipMouth(skipMouth + 1);
  }

  function prevMouth() {
    setSkipMouth(skipMouth - 1);
  }

  function nowMouth() {
    setSkipMouth(0);
  }

  return (
    <div>
      <button onClick={getCalendar}>Click</button>
      <button onClick={prevMouth}>-</button>
      <button onClick={nowMouth}>now</button>
      <button onClick={nextMouth}>+</button>
      <div>
        <Calendar currentDate={currentDate} skipMouth={skipMouth} />
      </div>
    </div>
  );
}
