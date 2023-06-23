import React, { useState, useEffect, use } from "react";
import styles from "./FormEvent.module.sass";
import { useForm } from "react-hook-form";
// import dayjs from "dayjs";
// dayjs.locale("th");

import { calendarData } from "../interface";

type Props = {
  onClick: Function | any;
};

interface formEvent extends calendarData {
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
}

export default function FormEvent({ onClick }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm();

  const watchAllDay = watch("allDay");


  function handleClick() {
    onClick({
      action: "back",
    });
  }

  function onSave(e: formEvent) {
    //convert to timestamp
    const { startDay, endDay, startTime, endTime, title, detail } = e;
    console.log("Orginal", e);

    let _startDay = startDay;

    const newObj: calendarData = {
      title,
      detail,
      startTimestamp: new Date(`${startDay} ${startTime}`).getTime(),
      endTimestamp: new Date(`${endDay} ${endTime}`).getTime(),
      allDay: watchAllDay,
      bgColor: "#000",
    };

    console.log(newObj);
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

        <input type="submit" defaultValue="Subscribe" />
      </form>
    </>
  );
}
