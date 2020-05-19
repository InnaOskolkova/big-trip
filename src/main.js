import {RenderPosition, MenuItem} from "./const";

import {render} from "./utils/dom";

import EventsModel from "./models/events";

import InfoComponent from "./components/info";
import MenuComponent from "./components/menu";
import TripComponent from "./components/trip";
import StatisticsComponent from "./components/statistics";

import FilterController from "./controllers/filter";
import TripController from "./controllers/trip";

import API from "./api";

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-controls`);
const addButtonElement = headerElement.querySelector(`.trip-main__event-add-btn`);
const mainElement = document.querySelector(`.page-main`);
const containerElement = mainElement.querySelector(`.page-body__container`);
const eventListElement = containerElement.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
const api = new API(`Basic ${Math.random()}`);

const menuComponent = new MenuComponent();
const tripComponent = new TripComponent();
const statisticsComponent = new StatisticsComponent();
statisticsComponent.hide();

const filterController = new FilterController(controlsElement, eventsModel);
const tripController = new TripController(tripComponent, eventsModel, api);

const menuItemChangeHandler = (menuItem) => {
  switch (menuItem) {
    case MenuItem.EVENTS:
      statisticsComponent.hide();
      tripController.show();
      break;
    case MenuItem.STATS:
      filterController.setDefaultType();
      tripController.hide();
      statisticsComponent.show();
      statisticsComponent.renderCharts(eventsModel.getAllEvents());
      break;
  }
};

const addButtonClickHandler = () => {
  menuComponent.setDefaultItem();
  filterController.setDefaultType();
  statisticsComponent.hide();
  tripController.show();
  tripController.createEvent();
};

const loadAndRenderEvents = () => {
  api.getEvents()
    .then((events) => eventsModel.setEvents(events))
    .finally(() => {
      tripController.render();
      menuComponent.setItemChangeHandler(menuItemChangeHandler);
      addButtonElement.addEventListener(`click`, addButtonClickHandler);
    });
};

render(headerElement, new InfoComponent(), RenderPosition.AFTERBEGIN);
render(controlsElement, menuComponent);
render(eventListElement, tripComponent);
render(containerElement, statisticsComponent);

filterController.render();
tripController.renderLoadingMessage();

Promise.all([
  api.getDestinations(),
  api.getOffers()
]).then(([destinations, typesToOffers]) => {
  tripController.setDestinations(destinations);
  tripController.setTypesToOffers(typesToOffers);
  loadAndRenderEvents();
}).catch(() => {
  tripController.renderErrorMessage();
});
