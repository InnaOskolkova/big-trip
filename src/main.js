import {RenderPosition, MenuItem} from "./const";

import {render} from "./utils/dom";

import EventsModel from "./models/events";

import InfoComponent from "./components/info";
import MenuComponent from "./components/menu";
import TripComponent from "./components/trip";
import StatisticsComponent from "./components/statistics";

import FilterController from "./controllers/filter";
import TripController from "./controllers/trip";

import {generateDestinations} from "./mock/destination";
import {generateOffers} from "./mock/offer";
import {generateEvents} from "./mock/event";

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-controls`);
const addButtonElement = headerElement.querySelector(`.trip-main__event-add-btn`);
const mainElement = document.querySelector(`.page-main`);
const containerElement = mainElement.querySelector(`.page-body__container`);
const eventListElement = containerElement.querySelector(`.trip-events`);

const destinations = generateDestinations();
const typesToOffers = generateOffers();

const eventsModel = new EventsModel();
eventsModel.setEvents(generateEvents(destinations, typesToOffers));

const menuComponent = new MenuComponent();
const tripComponent = new TripComponent();
const statisticsComponent = new StatisticsComponent();
statisticsComponent.hide();

const filterController = new FilterController(controlsElement, eventsModel);
const tripController = new TripController(tripComponent, eventsModel, destinations, typesToOffers);

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

menuComponent.setItemChangeHandler(menuItemChangeHandler);
addButtonElement.addEventListener(`click`, addButtonClickHandler);

render(headerElement, new InfoComponent(), RenderPosition.AFTERBEGIN);
render(controlsElement, menuComponent);
render(eventListElement, tripComponent);
render(containerElement, statisticsComponent);

filterController.render();
tripController.render();
