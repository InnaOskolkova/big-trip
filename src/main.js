import {RenderPosition, MenuItem} from "./const";

import {render} from "./utils/dom";

import EventsModel from "./models/events";

import InfoComponent from "./components/info";
import MenuComponent from "./components/menu";
import TripComponent from "./components/trip";
import StatisticsComponent from "./components/statistics";

import FilterController from "./controllers/filter";
import TripController from "./controllers/trip";

import API from "./api/api";
import Storage from "./api/storage";
import Provider from "./api/provider";

const headerElement = document.querySelector(`.trip-main`);
const controlsElement = headerElement.querySelector(`.trip-controls`);
const addButtonElement = headerElement.querySelector(`.trip-main__event-add-btn`);
const mainElement = document.querySelector(`.page-main`);
const containerElement = mainElement.querySelector(`.page-body__container`);
const eventListElement = containerElement.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
const api = new API();
const storage = new Storage(window.localStorage);
const provider = new Provider(api, storage);

const menuComponent = new MenuComponent();
const tripComponent = new TripComponent();
const statisticsComponent = new StatisticsComponent();
statisticsComponent.hide();

const filterController = new FilterController(controlsElement, eventsModel);
const tripController = new TripController(tripComponent, eventsModel, provider);

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

const windowLoadHandler = () => navigator.serviceWorker.register(`/sw.js`).catch(() => {});

const windowOfflineHandler = () => {
  document.title += ` [offline]`;
};

const windowOnlineHandler = () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (provider.isSyncNeeded) {
    provider.syncEvents()
      .then((events) => {
        eventsModel.setEvents(events);
        tripController.render();
        statisticsComponent.renderCharts(eventsModel.getAllEvents());
      });
  }
};

const loadAndRenderEvents = () => {
  provider.getEvents()
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

window.addEventListener(`load`, windowLoadHandler);

Promise.all([
  provider.getDestinations(),
  provider.getOffers()
]).then(([destinations, typesToOffers]) => {
  window.addEventListener(`offline`, windowOfflineHandler);
  window.addEventListener(`online`, windowOnlineHandler);
  tripController.setDestinations(destinations);
  tripController.setTypesToOffers(typesToOffers);
  loadAndRenderEvents();
}).catch(() => {
  tripController.renderErrorMessage();
});
