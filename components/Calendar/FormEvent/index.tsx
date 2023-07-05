import React, { useState, useEffect, useRef } from "react";
import styles from "./FormEvent.module.sass";
import { useForm } from "react-hook-form";
import { calendarData } from "../interface";
import Image from "next/image";
import checkIcn from "./check-icn.svg";
import axios from "axios";

import dynamic from "next/dynamic";
import { EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
  editMode?: boolean;
};

interface formEvent extends calendarData {
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
}

const bgColor = ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c", "#8338ec"];

const TEXT_EDITOR = false;

export default function FormEvent({ onClick, currentDate, editMode }: Props) {
  const [editorState, setEditorState] = useState<EditorState>();
  const { register, handleSubmit, watch, setValue } = useForm();

  const watchAllDay = watch("allDay");

  function handleClick() {
    if (editMode) {
      onClick({
        action: "back",
      });
    } else {
      onClick({
        action: "back",
      });
    }
  }

  function handleEditorChange(state: any) {
    setEditorState(state);
  }

  async function onSave(e: formEvent) {
    const { startDay, endDay, startTime, endTime, title, detail, bgColor } = e;

    // console.log("=>", e);

    const newObj: calendarData = {
      title,
      //@ts-ignore
      detail: !TEXT_EDITOR
        ? detail
        : editorState?.getCurrentContent().toObject(),
      startTimestamp: new Date(`${startDay} ${startTime}`).getTime(),
      endTimestamp: new Date(`${endDay} ${endTime}`).getTime(),
      allDay: watchAllDay,
      bgColor,
    };

    // console.log("📦", newObj);

    const res = await axios.post("/api/calendar", newObj);
    const data = await res.data;

    // console.log("👍", data);

    onClick({
      action: "save",
      data: data.data,
    });
  }

  useEffect(() => {
    if (editMode) {
      console.log("useEffect", currentDate);
      const editDateStart = new Date(currentDate?.startTimestamp);
      //timestamp to date
      setValue(
        "startDay",
        `${editDateStart.getFullYear()}-${
          editDateStart.getMonth() > 10
            ? editDateStart.getMonth() + 1
            : "0" + (editDateStart.getMonth() + 1)
        }-${
          editDateStart.getDate() > 10
            ? editDateStart.getDate()
            : "0" + editDateStart.getDate()
        }`
      );
      setValue(
        "startTime",
        `${
          editDateStart.getHours() > 10
            ? editDateStart.getHours()
            : "0" + editDateStart.getHours()
        }:${
          editDateStart.getMinutes() > 10
            ? editDateStart.getMinutes()
            : "0" + editDateStart.getMinutes()
        }:00`
      );

      const editDateEnd = new Date(currentDate?.endTimestamp);
      setValue(
        "endDay",
        `${editDateEnd.getFullYear()}-${
          editDateEnd.getMonth() > 10
            ? editDateEnd.getMonth() + 1
            : "0" + (editDateEnd.getMonth() + 1)
        }-${
          editDateEnd.getDate() > 10
            ? editDateEnd.getDate()
            : "0" + editDateEnd.getDate()
        }`
      );
      setValue(
        "endTime",
        `${
          editDateEnd.getHours() > 10
            ? editDateEnd.getHours()
            : "0" + editDateEnd.getHours()
        }:${
          editDateEnd.getMinutes() > 10
            ? editDateEnd.getMinutes()
            : "0" + editDateEnd.getMinutes()
        }:00`
      );

      setValue("allDay", currentDate?.allDay);
      setValue("title", currentDate?.title);
      setValue("detail", currentDate?.detail);
      setValue("bgColor", currentDate?.bgColor);
    } else {
      setValue("allDay", true);
      setValue(
        "startDay",
        `${currentDate?.year}-${
          currentDate?.month > 10
            ? currentDate?.month + 1
            : "0" + (currentDate?.month + 1)
        }-${currentDate?.day > 10 ? currentDate?.day : "0" + currentDate?.day}`
      );
      setValue(
        "endDay",
        `${currentDate?.year}-${
          currentDate?.month > 10
            ? currentDate?.month + 1
            : "0" + (currentDate?.month + 1)
        }-${currentDate?.day > 10 ? currentDate?.day : "0" + currentDate?.day}`
      );
      setValue("bgColor", "#3498db");
      setValue("startTime", "00:00:00");
      setValue("endTime", "23:59:00");
    }
  }, [editMode]);

  return (
    <>
      <div className={styles.buttonWarper}>
        <button onClick={handleClick}>Back</button>
      </div>
      {/* {new Date(currentDate?.year, currentDate?.month, currentDate?.day).getTime()} */}
      <form className={styles.form} onSubmit={handleSubmit(onSave)}>
        <div className={styles.checkbox_group}>
          <label>
            <input type="checkbox" {...register("allDay")} />
            <span>ตลอดทั้งวัน</span>
          </label>
        </div>
        <label htmlFor="title">เพิ่มชื่อและเวลา</label>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
          autoFocus
        />
        <label htmlFor="startDay">วันเริ่มต้น</label>
        <input
          type="date"
          name="startDay"
          id="startDay"
          {...register("startDay", { required: true })}
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
        <input
          type="date"
          name="endDay"
          id="endDay"
          {...register("endDay", { required: true })}
        />
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
                {...register("bgColor")}
                className={styles.color1}
                value={bgColor[0]}
              />
              <label htmlFor="color1">
                <span>
                  <Image src={checkIcn} alt="Checked Icon" quality={50} />
                </span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="color2"
                {...register("bgColor")}
                className={styles.color2}
                value={bgColor[1]}
              />
              <label htmlFor="color2">
                <span>
                  <Image src={checkIcn} alt="Checked Icon" quality={50} />
                </span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="color3"
                {...register("bgColor")}
                className={styles.color3}
                value={bgColor[2]}
              />
              <label htmlFor="color3">
                <span>
                  <Image src={checkIcn} alt="Checked Icon" quality={50} />
                </span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="color4"
                {...register("bgColor")}
                className={styles.color4}
                value={bgColor[3]}
              />
              <label htmlFor="color4">
                <span>
                  <Image src={checkIcn} alt="Checked Icon" quality={50} />
                </span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="color5"
                {...register("bgColor")}
                className={styles.color5}
                value={bgColor[4]}
              />
              <label htmlFor="color5">
                <span>
                  <Image src={checkIcn} alt="Checked Icon" quality={50} />
                </span>
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </>
  );
}
