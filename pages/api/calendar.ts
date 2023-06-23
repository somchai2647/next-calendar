// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { calendarData } from "../../components/Calendar/interface";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<calendarData[]>
) {
  const fakeDate: calendarData[] = [
    {
      id: "1",
      title: "Meeting",
      detail: "Meeting with Andrew Piker",
      allDay: true,
      startTimestamp: new Date(2023, 5, 23).getTime(),
      endTimestamp: new Date(2023, 5, 25).getTime(),
      bgColor: "#3a86ff",
    },
    // {
    //   id: "2",
    //   title: "Shopping",
    //   detail: "Shopping at Stack",
    //   allDay: true,
    //   startTimestamp: new Date(2023, 5, 24).getTime(),
    //   endTimestamp: new Date(2023, 5, 26).getTime(),
    //   bgColor: "#ffbe0b",
    // },
    {
      id: "3",
      title: "Test",
      detail: "Test System",
      allDay: true,
      startTimestamp: new Date(2023, 5, 23).getTime(),
      endTimestamp: new Date(2023, 5, 30).getTime(),
      bgColor: "#fb5607",
    },
    // {
    //   id: "4",
    //   title: "Dinner",
    //   detail: "Dinner with Andrew Piker",
    //   allDay: true,
    //   startTimestamp: new Date(2023, 5, 24).getTime(),
    //   endTimestamp: new Date(2023, 5, 24).getTime(),
    //   bgColor: "#ff006e",
    // }
  ];

  res.status(200).json(fakeDate);
}

//color
// #3a86ff
// #ffbe0b
// #fb5607
// #ff006e
// #8338ec
