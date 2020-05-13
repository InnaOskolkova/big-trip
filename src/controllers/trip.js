import {DEFAULT_SORT_TYPE} from "../const";

import {render} from "../utils/dom";

import NoEventsMessageComponent from "../components/no-events-message";
import SortComponent from "../components/sort";
import EventListComponent from "../components/event-list";
import EventGroupComponent from "../components/event-group";

import EventController from "./event";

export default class TripController {
  constructor(container, eventsModel, destinations, typesToOffers) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._destinations = destinations;
    this._typesToOffers = typesToOffers;

    this._eventControllers = [];

    this._noEventsMessageComponent = new NoEventsMessageComponent();
    this._sortComponent = new SortComponent();
    this._eventListComponent = new EventListComponent();

    this._createEventControllers = this._createEventControllers.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._eventsModel.setFilterTypeChangeHandler(this._filterTypeChangeHandler);
    this._sortComponent.setTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render() {
    if (!this._eventsModel.getEvents().length) {
      render(this._container, this._noEventsMessageComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._eventListComponent);

    this._rerenderEvents();
  }

  _createEventControllers(eventGroup) {
    const eventGroupComponent = new EventGroupComponent(eventGroup);

    this._eventControllers = this._eventControllers.concat(eventGroup.events.map((event) => {
      const eventController = new EventController(
          eventGroupComponent,
          event,
          this._destinations,
          this._typesToOffers,
          this._dataChangeHandler,
          this._viewChangeHandler
      );

      eventController.render();
      return eventController;
    }));

    render(this._eventListComponent, eventGroupComponent);
  }

  _rerenderEvents() {
    this._eventListComponent.clear();
    this._eventControllers = [];
    this._eventsModel.getEvents().forEach(this._createEventControllers);
  }

  _dataChangeHandler(oldEvent, newEvent) {
    this._eventsModel.updateEvent(oldEvent.id, newEvent);
  }

  _viewChangeHandler() {
    this._eventControllers.forEach((eventController) => eventController.setDefaultView());
  }

  _filterTypeChangeHandler() {
    this._sortComponent.setDefaultType();
    this._eventsModel.setSortType(DEFAULT_SORT_TYPE);
    this._rerenderEvents();
  }

  _sortTypeChangeHandler(sortType) {
    this._eventsModel.setSortType(sortType);
    this._rerenderEvents();
  }
}
