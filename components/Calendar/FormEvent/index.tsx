import React, { useState, useEffect, useRef } from "react";
import styles from "./FormEvent.module.sass";
import { useForm } from "react-hook-form";
import { calendarData } from "../interface";
import axios from "axios";

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

export default function FormEvent({ onClick, currentDate }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm();

  const watchAllDay = watch("allDay");

  function handleClick() {
    onClick({
      action: "back",
    });
  }

  async function onSave(e: formEvent) {
    const { startDay, endDay, startTime, endTime, title, detail } = e;

    console.log("📦", e);

    const newObj: calendarData = {
      title,
      detail,
      startTimestamp: new Date(`${startDay} ${startTime}`).getTime(),
      endTimestamp: new Date(`${endDay} ${endTime}`).getTime(),
      allDay: watchAllDay,
      bgColor: "#000",
    };

    // console.log("📦", newObj);

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

        <label htmlFor="bgColor">สี</label>

        <input type="submit" defaultValue="Subscribe" />
      </form>
    </>
  );
}
