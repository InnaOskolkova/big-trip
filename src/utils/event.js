import {groupBy} from "./common";
import {formatISODate, checkIfPast, checkIfFuture} from "./date";

export const getEventDuration = (event) => event.endDate - event.beginDate;

export const groupEventsByType = (events) => groupBy(events, (event) => event.type);

export const groupEventsByBeginDate = (events) => groupBy(events, (event) => formatISODate(event.beginDate));

export const checkIfPastEvent = (event) => checkIfPast(event.endDate);

export const checkIfFutureEvent = (event) => checkIfFuture(event.beginDate);

export const countEventsMoney = (events) => events.reduce((money, event) => money + event.price, 0);

export const countEventsDuration = (events) => events.reduce((duration, event) => duration + getEventDuration(event), 0);
