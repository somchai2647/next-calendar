// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { calendarData } from "../../components/Calendar/interface";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<calendarData[]>
) {
  const fakeDate: calendarData[] = [
    {
      id: "12312321",
      name: "EventLastWeekofMouth",
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      allDay: false,
      startDate: 1690563600000,
      endDate: 1690650000000,
      bgColor: "#3a86ff",
    },
    {
      id: "43312344",
      name: "isMonMon3",
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      allDay: true,
      startDate: 1689872400000,
      endDate: 1689872400000,
      bgColor: "#f4a261",
    },
    {
      id: "43312343",
      name: "isMonMon2",
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      allDay: true,
      startDate: 1689872400000,
      endDate: 1689872400000,
      bgColor: "#d62828",
    },
    {
      id: "43312321",
      name: "isMonMon",
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      allDay: true,
      startDate: 1689872400000,
      endDate: 1689872400000,
      bgColor: "#8338ec",
    },
  ];

  res.status(200).json(fakeDate);
}
