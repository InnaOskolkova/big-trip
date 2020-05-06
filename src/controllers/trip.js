import {DEFAULT_SORT_TYPE} from "../const";

import {replaceElements} from "../utils/common";
import {render} from "../utils/dom";
import {groupEventsByBeginDate, sortEvents} from "../utils/event";

import NoEventsMessageComponent from "../components/no-events-message";
import SortComponent from "../components/sort";
import EventListComponent from "../components/event-list";
import EventGroupComponent from "../components/event-group";

import EventController from "./event";

export default class TripController {
  constructor(container, destinations, typesToOffers) {
    this._container = container;

    this._events = null;
    this._eventControllers = null;

    this._destinations = destinations;
    this._typesToOffers = typesToOffers;

    this._noEventsMessageComponent = new NoEventsMessageComponent();
    this._sortComponent = new SortComponent();
    this._eventListComponent = new EventListComponent();

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render(events) {
    this._events = events;

    if (!this._events.length) {
      render(this._container, this._noEventsMessageComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._eventListComponent);

    this._renderGroupedEvents(groupEventsByBeginDate(this._events));
  }

  _createEventControllers(events, eventGroupComponent) {
    return events.map((event) => {
      const eventController = new EventController(
          event,
          this._destinations,
          this._typesToOffers,
          eventGroupComponent,
          this._dataChangeHandler,
          this._viewChangeHandler
      );

      eventController.render();
      return eventController;
    });
  }

  _renderGroupedEvents(groupedEvents) {
    this._eventControllers = [];

    Object.entries(groupedEvents).forEach(([dateString, events], i) => {
      const eventGroupComponent = new EventGroupComponent({number: i + 1, date: new Date(dateString)});
      this._eventControllers = this._eventControllers.concat(
          this._createEventControllers(events, eventGroupComponent)
      );
      render(this._eventListComponent, eventGroupComponent);
    });
  }

  _renderSortedEvents(sortedEvents) {
    const eventGroupComponent = new EventGroupComponent();
    this._eventControllers = this._createEventControllers(sortedEvents, eventGroupComponent);
    render(this._eventListComponent, eventGroupComponent);
  }

  _dataChangeHandler(oldEvent, newEvent) {
    replaceElements(this._events, oldEvent, newEvent);
  }

  _viewChangeHandler() {
    this._eventControllers.forEach((eventController) => eventController.setDefaultView());
  }

  _sortTypeChangeHandler(sortType) {
    this._eventListComponent.clear();

    if (sortType === DEFAULT_SORT_TYPE) {
      this._renderGroupedEvents(groupEventsByBeginDate(this._events));
    } else {
      this._renderSortedEvents(sortEvents(this._events, sortType));
    }
  }
}
