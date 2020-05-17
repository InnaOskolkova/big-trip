import {groupBy} from "./common";
import {formatISODate, checkIfPast, checkIfFuture} from "./date";

export const getEventDuration = (event) => event.endDate - event.beginDate;

export const groupEventsByBeginDate = (events) => groupBy(events, (event) => formatISODate(event.beginDate));

export const checkIfPastEvent = (event) => checkIfPast(event.endDate);

export const checkIfFutureEvent = (event) => checkIfFuture(event.beginDate);
