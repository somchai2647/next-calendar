export interface CallBackDate {
  day: number;
  month: number;
  year: number;
}

export interface calendarData {
  id?: string;
  title: string;
  detail: string;
  allDay: boolean;
  startTimestamp: number;
  endTimestamp: number;
  bgColor: string;
}

