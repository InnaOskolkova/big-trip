import {SortType} from "../const";

import {groupBy} from "./common";
import {formatISODate} from "./date";

export const groupEventsByBeginDate = (events) => groupBy(events, (event) => formatISODate(event.beginDate));

export const sortEvents = (events, sortType) => {
  const eventsCopy = [...events];
  let sortedEvents;

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = eventsCopy.sort((a, b) => b.beginDate - a.beginDate);
      break;
    case SortType.PRICE:
      sortedEvents = eventsCopy.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedEvents;
};
