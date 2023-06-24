import React, { useState, useEffect, useRef } from "react";
import styles from "./FormEvent.module.sass";
import { useForm } from "react-hook-form";
import { calendarData } from "../interface";
import axios from "axios";

import dynamic from "next/dynamic";
import { EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then(mod => mod.Editor),
//   { ssr: false }
// )

const Editor = dynamic(
  () => import("../TextEditor").then((mod) => mod.default),
  { ssr: false }
);

type Props = {
  onClick: Function | any;
  currentDate:
    | {
        day: number;
        month: number;
        year: number;
      }
    | any;
};

interface formEvent extends calendarData {
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
}

const bgColor = ["#3a86ff", "#ffbe0b", "#fb5607", "#ff006e", "#8338ec"];

const TEXT_EDITOR = false;

export default function FormEvent({ onClick, currentDate }: Props) {
  const [editorState, setEditorState] = useState<EditorState>();
  const { register, handleSubmit, watch, setValue } = useForm();

  const watchAllDay = watch("allDay");

  function handleClick() {
    onClick({
      action: "back",
    });
  }

  function handleEditorChange(state: any) {
    setEditorState(state);
  }

  async function onSave(e: formEvent) {
    const { startDay, endDay, startTime, endTime, title, detail } = e;

    console.log("📦", e);

    const newObj: calendarData = {
      title,
      //@ts-ignore
      detail: editorState?.getCurrentContent().toObject(),
      startTimestamp: new Date(`${startDay} ${startTime}`).getTime(),
      endTimestamp: new Date(`${endDay} ${endTime}`).getTime(),
      allDay: watchAllDay,
      bgColor: "#000",
    };

    console.log("📦", newObj);

    // const res = await axios.post("/api/calendar", newObj);
    // const data = await res.data;

    // console.log("👍", data);

    // onClick({
    //   action: "save",
    // });
  }

  useEffect(() => {
    setValue("allDay", true);
    setValue(
      "startDay",
      `${currentDate?.year}-${
        currentDate?.month > 10 ? currentDate?.month : "0" + currentDate?.month
      }-${currentDate?.day > 10 ? currentDate?.day : "0" + currentDate?.day}`
    );
    setValue(
      "endDay",
      `${currentDate?.year}-${
        currentDate?.month > 10 ? currentDate?.month : "0" + currentDate?.month
      }-${currentDate?.day > 10 ? currentDate?.day : "0" + currentDate?.day}`
    );
  }, []);

  return (
    <>
      <button onClick={handleClick}>Back</button>
      <form className={styles.form} onSubmit={handleSubmit(onSave)}>
        <div className={styles.checkbox_group}>
          <label>
            <input type="checkbox" {...register("allDay")} />
            <span>ตลอดทั้งวัน</span>
          </label>
        </div>
        <label htmlFor="title">เพิ่มชื่อและเวลา</label>
        <input type="text" id="title" {...register("title")} autoFocus />
        <label htmlFor="startDay">วันเริ่มต้น</label>
        <input
          type="date"
          name="startDay"
          id="startDay"
          {...register("startDay")}
        />
        {!watchAllDay && (
          <>
            <label htmlFor="startTime">เวลาเริ่มต้น</label>
            <input
              type="time"
              name="startTime"
              id="startTime"
              {...register("startTime")}
            />
          </>
        )}
        <label htmlFor="endDay">วันสื้นสุด</label>
        <input type="date" name="endDay" id="endDay" {...register("endDay")} />
        {!watchAllDay && (
          <>
            <label htmlFor="endTime">เวลาสิ้นสุด</label>
            <input
              type="time"
              name="endTime"
              id="endTime"
              {...register("endTime")}
            />
          </>
        )}

        <label htmlFor="detail">รายละเอียดงาน</label>
        <textarea
          name="detail"
          id="detail"
          cols={30}
          rows={5}
          {...register("detail")}
        ></textarea>
        {TEXT_EDITOR && (
          <Editor
          // editorState={editorState}
          // onEditorStateChange={handleEditorChange}
          />
        )}

        <div className={styles.warpperColor}>
        <label htmlFor="bgColor">สี</label>
          <div className={styles.custom_radios}>
            <div>
              <input
                type="radio"
                id="color1"
                name="color"
                className={styles.color1}
              />
              <label htmlFor="color1">
                <span>
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                    alt="Checked Icon"
                  />
                </span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="color2"
                name="color"
                className={styles.color2}
              />
              <label htmlFor="color2">
                <span>
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                    alt="Checked Icon"
                  />
                </span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="color3"
                name="color"
                className={styles.color3}
              />
              <label htmlFor="color3">
                <span>
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                    alt="Checked Icon"
                  />
                </span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="color4"
                name="color"
                className={styles.color4}
              />
              <label htmlFor="color4">
                <span>
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                    alt="Checked Icon"
                  />
                </span>
              </label>
            </div>
          </div>
        </div>

        <input type="submit" defaultValue="Subscribe" />
      </form>
    </>
  );
}
