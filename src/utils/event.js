import {groupBy} from "./common";
import {formatISODate} from "./date";

export const getEventDuration = (event) => event.endDate - event.beginDate;

export const groupEventsByBeginDate = (events) => groupBy(events, (event) => formatISODate(event.beginDate));
