import {DEFAULT_SORT_TYPE} from "../const";

import {groupEventsByBeginDate} from "../utils/event";
import {sortEvents} from "../utils/sort";

export default class Events {
  constructor() {
    this._events = [];

    this._sortType = DEFAULT_SORT_TYPE;

    this._dataChangeHandlers = [];
  }

  setEvents(events) {
    this._events = events;
  }

  getEvents() {
    if (!this._events.length) {
      return [];
    }

    if (this._sortType === DEFAULT_SORT_TYPE) {
      return Object.entries(groupEventsByBeginDate(this._events)).map(([dateString, events], i) => ({
        number: i + 1,
        date: new Date(dateString),
        events
      }));
    }

    return [{events: sortEvents(this._events, this._sortType)}];
  }

  getAllEvents() {
    return this._events;
  }

  updateEvent(id, newEvent) {
    const index = this._events.findIndex((event) => event.id === id);
    this._events = [...this._events.slice(0, index), newEvent, ...this._events.slice(index + 1)];
    this._callHandlers(this._dataChangeHandlers);
  }

  setSortType(sortType) {
    this._sortType = sortType;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
