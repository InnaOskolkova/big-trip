import {RenderPosition, DEFAULT_SORT_TYPE, DEFAULT_EVENT_TYPE, EventViewMode} from "../const";

import {render, remove} from "../utils/dom";

import MessageComponent from "../components/message";
import SortComponent from "../components/sort";
import EventListComponent from "../components/event-list";
import EventGroupComponent from "../components/event-group";

import EventController from "./event";

export default class TripController {
  constructor(container, eventsModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._api = api;

    this._destinations = null;
    this._typesToOffers = null;

    this._eventCreator = null;
    this._eventControllers = [];

    this._messageComponent = new MessageComponent();
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

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  setTypesToOffers(typesToOffers) {
    this._typesToOffers = typesToOffers;
  }

  render() {
    this._clear();

    const events = this._eventsModel.getEvents();

    if (events.length) {
      render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
      render(this._container, this._eventListComponent);
      events.forEach(this._createEventControllers);
    } else if (!this._eventCreator) {
      this._messageComponent.showNoEventsMessage();
      render(this._container, this._messageComponent);
    }
  }

  renderLoadingMessage() {
    this._clear();
    this._messageComponent.showLoadingMessage();
    render(this._container, this._messageComponent);
  }

  renderErrorMessage() {
    this._clear();
    this._messageComponent.showErrorMessage();
    render(this._container, this._messageComponent);
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

  show() {
    this._container.show();
  }

  hide() {
    this._container.hide();
    this._eventControllers.forEach((eventController) => eventController.setDefaultView());

    if (this._eventCreator) {
      this._eventCreator.remove();
      this._eventCreator = null;
    }
  }

  _clear() {
    remove(this._messageComponent);
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

  _dataChangeHandler(eventController, oldEvent, newEvent) {
    if (oldEvent && newEvent) {
      this._api.updateEvent(oldEvent.id, newEvent)
        .then((eventFromServer) => {
          this._eventsModel.updateEvent(oldEvent.id, eventFromServer);
          this.render();
        }).catch(() => eventController.showError());

      return;
    }

    if (oldEvent) {
      this._api.deleteEvent(oldEvent.id)
        .then(() => {
          this._eventsModel.deleteEvent(oldEvent.id);
          this.render();
        }).catch(() => eventController.showError());

      return;
    }

    if (newEvent) {
      this._api.createEvent(newEvent)
        .then((eventFromServer) => {
          this._eventsModel.createEvent(eventFromServer);
          this._eventCreator.remove();
          this._eventCreator = null;
          this.render();
        }).catch(() => this._eventCreator.showError());

      return;
    }

    this._eventCreator.remove();
    this._eventCreator = null;
    this.render();
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
