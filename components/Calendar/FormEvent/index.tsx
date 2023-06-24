import React, { useState, useEffect, use } from "react";
import styles from "./FormEvent.module.sass";
import { useForm } from "react-hook-form";
import { calendarData } from "../interface";
import axios from "axios";

type Props = {
  onClick: Function | any;
};

interface formEvent extends calendarData {
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
}

const bgColor = ["#3a86ff", "#ffbe0b", "#fb5607", "#ff006e", "#8338ec"];

export default function FormEvent({ onClick }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm();

  const watchAllDay = watch("allDay");

  function handleClick() {
    onClick({
      action: "back",
    });
  }

  async function onSave(e: formEvent) {
    const { startDay, endDay, startTime, endTime, title, detail } = e;
    console.log("Orginal", e);

    const newObj: calendarData = {
      title,
      detail,
      startTimestamp: new Date(`${startDay} ${startTime}`).getTime(),
      endTimestamp: new Date(`${endDay} ${endTime}`).getTime(),
      allDay: watchAllDay,
      bgColor: "#000",
    };

    const res = await axios.post("/api/calendar", newObj);
    const data = await res.data;

    console.log("👍", data);
  }

  useEffect(() => {
    setValue("allDay", true);
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
        <input type="text" id="title" {...register("title")} />
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
        <div className={styles.custom_radios}>
          <div>
            <input
              type="radio"
              id="color1"
              name="color"
              className={styles.color1}
              defaultValue="color1"
              defaultChecked
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
              defaultValue="color2"
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
              defaultValue="color3"
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
              defaultValue="color4"
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

        <input type="submit" defaultValue="Subscribe" />
      </form>
    </>
  );
}
