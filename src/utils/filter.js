import {FilterType} from "../const";

import {checkIfPastEvent, checkIfFutureEvent} from "./event";

export const filterEvents = (events, filterType) => {
  let filteredEvents;

  switch (filterType) {
    case FilterType.EVERYTHING:
      filteredEvents = [...events];
      break;
    case FilterType.FUTURE:
      filteredEvents = events.filter(checkIfFutureEvent);
      break;
    case FilterType.PAST:
      filteredEvents = events.filter(checkIfPastEvent);
      break;
  }

  return filteredEvents;
};
