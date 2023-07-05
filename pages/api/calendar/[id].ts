// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { calendarData } from "../../../components/Calendar/interface";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yeymwzuxuvbxlkxokvaa.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<calendarData[]>
) {
  //switch case for different methods
  switch (req.method) {
    case "GET":
      await getEvent(req, res);
      break;
    case "PUT":
      await updateEvent(req, res);
      break;
    case "DELETE":
      await deleteEvent(req, res);
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}

async function getEvent(
  req: NextApiRequest,
  res: NextApiResponse<calendarData[]>
) {
  let id = req.query.id;
  let { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id);

  res.status(200).json(events);
}

async function updateEvent(req: NextApiRequest, res: NextApiResponse) {
  const { title, detail, allDay, startTimestamp, endTimestamp, bgColor } =
    req.body;

  const id = req.query.id;

  let { data: event, error } = await supabase
    .from("events")
    .update({
      title,
      detail,
      allDay,
      startTimestamp,
      endTimestamp,
      bgColor,
    })
    .eq("id", id)
    .select("*")
    .single();

  res.status(200).json({
    resCode: "200",
    data: event,
  });
}

async function deleteEvent(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  let { data: event, error } = await supabase

    .from("events")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  res.status(200).json({
    resCode: "200",
    data: event,
  });
}

//color
// #3a86ff
// #ffbe0b
// #fb5607
// #ff006e
// #8338ec

// const fakeDate: calendarData[] = [
//   {
//     id: "1",
//     title: "Meeting",
//     detail: "Meeting with Andrew Piker",
//     allDay: true,
//     startTimestamp: new Date(2023, 5, 23).getTime(),
//     endTimestamp: new Date(2023, 5, 25).getTime(),
//     bgColor: "#3a86ff",
//   },
//   // {
//   //   id: "2",
//   //   title: "Shopping",
//   //   detail: "Shopping at Stack",
//   //   allDay: true,
//   //   startTimestamp: new Date(2023, 5, 24).getTime(),
//   //   endTimestamp: new Date(2023, 5, 26).getTime(),
//   //   bgColor: "#ffbe0b",
//   // },
//   {
//     id: "3",
//     title: "Test",
//     detail: "Test System",
//     allDay: true,
//     startTimestamp: new Date(2023, 5, 23).getTime(),
//     endTimestamp: new Date(2023, 5, 30).getTime(),
//     bgColor: "#fb5607",
//   },
//   // {
//   //   id: "4",
//   //   title: "Dinner",
//   //   detail: "Dinner with Andrew Piker",
//   //   allDay: true,
//   //   startTimestamp: new Date(2023, 5, 24).getTime(),
//   //   endTimestamp: new Date(2023, 5, 24).getTime(),
//   //   bgColor: "#ff006e",
//   // }
// ];
