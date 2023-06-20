// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface myData {
  name: string;
  detail: string;
  allDay: boolean;
  startDate: number;
  endDate: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<myData[]>
) {
  const fakeDate: myData[] = [
    {
      name: "EventLastWeekofMouth",
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      allDay: false,
      startDate: 1630488000000,
      endDate: 1630491600000,
    },
    {
      name: "isMonMon",
      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      allDay: true,
      startDate: 1688011620000,
      endDate: 1688130420000,
    }
  ];

  res.status(200).json(fakeDate);
}
