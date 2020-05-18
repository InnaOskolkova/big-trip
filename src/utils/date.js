import moment from "moment";

const formatDateUnit = (unit) => String(unit).slice(-2).padStart(2, `0`);

export const formatTime = (date) => moment(date).format(`HH:mm`);

export const formatDate = (date) => moment(date).format(`MMM D`);

export const formatFullDate = (date) => moment(date).format(`DD/MM/YY`);

export const formatISODate = (date) => moment(date).format(`YYYY-MM-DD`);

export const formatDuration = (beginDate, endDate) => {
  const duration = moment.duration(endDate - beginDate);

  const dayAmount = duration.days();
  const hourAmount = duration.hours();
  const minuteAmount = duration.minutes();

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

export const countHours = (duration) => Math.floor(moment.duration(duration).asHours());

export const checkIfPast = (date) => date < Date.now();

export const checkIfFuture = (date) => date > Date.now();

export const compareDates = (leftDate, rightDate) => moment(leftDate).isSame(rightDate);

export const getMaxDate = (dates) => new Date(Math.max(...dates));
