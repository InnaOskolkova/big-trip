import {MONTHS, MILLISECONDS_PER_MINUTE, MILLISECONDS_PER_HOUR, MILLISECONDS_PER_DAY} from "../const";

const formatDateUnit = (unit) => String(unit).slice(-2).padStart(2, `0`);

export const formatTime = (date) => `${formatDateUnit(date.getHours())}:${formatDateUnit(date.getMinutes())}`;

export const formatDate = (date) => `${MONTHS[date.getMonth()]} ${date.getDate()}`;

export const formatFullDate = (date) => (
  `${
    formatDateUnit(date.getDate())
  }/${
    formatDateUnit(date.getMonth() + 1)
  }/${
    formatDateUnit(date.getFullYear())
  }`
);

export const formatISODate = (date) => (
  `${
    date.getFullYear()
  }-${
    formatDateUnit(date.getMonth() + 1)
  }-${
    formatDateUnit(date.getDate())
  }`
);

export const formatDuration = (beginDate, endDate) => {
  let duration = endDate - beginDate;

  const dayAmount = Math.floor(duration / MILLISECONDS_PER_DAY);
  duration %= MILLISECONDS_PER_DAY;

  const hourAmount = Math.floor(duration / MILLISECONDS_PER_HOUR);
  duration %= MILLISECONDS_PER_HOUR;

  const minuteAmount = Math.floor(duration / MILLISECONDS_PER_MINUTE);

  return (
    `${
      dayAmount ? `${formatDateUnit(dayAmount)}D` : ``
    } ${
      hourAmount ? `${formatDateUnit(hourAmount)}H` : ``
    } ${
      minuteAmount ? `${formatDateUnit(minuteAmount)}M` : ``
    }`
  ).trim();
};
