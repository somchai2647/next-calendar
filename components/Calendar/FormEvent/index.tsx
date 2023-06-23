import React, { useState, useEffect, use } from "react";
import styles from "./FormEvent.module.sass";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
dayjs.locale("th");
type Props = {
  onClick: Function | any;
};

export default function FormEvent({ onClick }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm();

  //react form hook watch allDay
  const watchAllDay = watch("allDay");

  const [allDay, setAllDay] = useState(true);

  function handleClick() {
    onClick({
      action: "back",
    });
  }

  function onSave(e: any) {
    //convert to timestamp
    const { startDate, endDate, startTime, endTime, name, detail } = e;

    console.log(startDate, endDate, startTime, endTime);

    const startDateString = watchAllDay
      ? startDate
      : `${startDate} ${startTime}`;
    const endDateString = watchAllDay ? endDate : `${endDate} ${endTime}`;

    const startDateStringTimestamp = dayjs(startDateString).toDate().getTime();
    const endDateStringTimestamp = dayjs(endDateString).toDate().getTime();

    e = {
      name,
      detail,
      allDay: watchAllDay,
      startDate: startDateStringTimestamp,
      endDate: endDateStringTimestamp,
    };

    console.log(e);
  }

  useEffect(() => {
    setValue("allDay", true);
    setAllDay(true);
  }, []);

  console.log(watchAllDay);

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
        <label htmlFor="startDate">วันเริ่มต้น</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          {...register("startDate")}
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
        <label htmlFor="endDate">วันสื้นสุด</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          {...register("endDate")}
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

        <input type="submit" defaultValue="Subscribe" />
      </form>
    </>
  );
}
