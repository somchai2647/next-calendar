import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";

type Props = {};


export default function index({}: Props) {

  return (
    <div>
      <Calendar urlFetch="/api/calendar" />
    </div>
  );
}
