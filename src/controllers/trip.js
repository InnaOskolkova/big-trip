import {RenderPosition, DEFAULT_SORT_TYPE, DEFAULT_EVENT_TYPE, EventViewMode} from "../const";

import {render, remove} from "../utils/dom";

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

    this._eventCreator = null;
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
    this._clear();

    const events = this._eventsModel.getEvents();

    if (events.length) {
      render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
      render(this._container, this._eventListComponent);
      events.forEach(this._createEventControllers);
    } else if (!this._eventCreator) {
      render(this._container, this._noEventsMessageComponent);
    }
  }

  createEvent() {
    if (this._eventCreator) {
      return;
    }

    this._eventCreator = new EventController(
        this._container,
        this._getDefaultEvent(),
        this._destinations,
        this._typesToOffers,
        this._dataChangeHandler,
        this._viewChangeHandler
    );

    this._eventCreator.render(EventViewMode.CREATOR);
    this.render();
  }

  _clear() {
    remove(this._noEventsMessageComponent);
    remove(this._sortComponent);
    remove(this._eventListComponent);

    this._eventControllers.forEach((eventController) => eventController.remove());
    this._eventControllers = [];
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

  _getDefaultEvent() {
    const date = new Date();

    return {
      type: DEFAULT_EVENT_TYPE,
      destination: this._destinations[0],
      beginDate: date,
      endDate: date,
      price: 0,
      isFavorite: false,
      offers: []
    };
  }

  _dataChangeHandler(oldEvent, newEvent) {
    if (oldEvent && newEvent) {
      this._eventsModel.updateEvent(oldEvent.id, newEvent);
    } else if (oldEvent) {
      this._eventsModel.deleteEvent(oldEvent.id);
    } else if (newEvent) {
      this._eventsModel.addEvent(newEvent);
    }

    if (oldEvent || newEvent) {
      this.render();
    }

    if (this._eventCreator) {
      this._eventCreator.remove();
      this._eventCreator = null;
    }
  }

  _viewChangeHandler() {
    this._eventControllers.forEach((eventController) => eventController.setDefaultView());

    if (this._eventCreator) {
      this._eventCreator.remove();
      this._eventCreator = null;
    }
  }

  _filterTypeChangeHandler() {
    this._sortComponent.setDefaultType();
    this._eventsModel.setSortType(DEFAULT_SORT_TYPE);
    this.render();
  }

  _sortTypeChangeHandler(sortType) {
    this._eventsModel.setSortType(sortType);
    this.render();
  }
}
