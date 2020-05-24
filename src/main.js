import {MenuItem} from "./const";

import {render} from "./utils/dom";

import EventsModel from "./models/events";

import TripComponent from "./components/trip";
import StatisticsComponent from "./components/statistics";

import HeaderController from "./controllers/header";
import TripController from "./controllers/trip";

import API from "./api/api";
import Storage from "./api/storage";
import Provider from "./api/provider";

const headerElement = document.querySelector(`.trip-main`);
const containerElement = document.querySelector(`.page-main .page-body__container`);
const eventListElement = containerElement.querySelector(`.trip-events`);

const tripComponent = new TripComponent();
const statisticsComponent = new StatisticsComponent();

render(eventListElement, tripComponent);
render(containerElement, statisticsComponent);
statisticsComponent.hide();

const eventsModel = new EventsModel();
const provider = new Provider(new API(), new Storage(window.localStorage));

const menuItemChangeHandler = (menuItem) => {
  switch (menuItem) {
    case MenuItem.EVENTS:
      headerController.showFilters();
      tripController.show();
      statisticsComponent.hide();
      break;
    case MenuItem.STATS:
      headerController.setDefaultFilterType();
      headerController.hideFilters();
      tripController.hide();
      statisticsComponent.show();
      statisticsComponent.renderCharts(eventsModel.getAllEvents());
      break;
  }
};

const addButtonClickHandler = () => {
  headerController.setDefaultMenuItem();
  headerController.setDefaultFilterType();
  headerController.showFilters();
  headerController.disableAddButton();
  statisticsComponent.hide();
  tripController.show();
  tripController.createEvent();
};

const headerController = new HeaderController(headerElement, eventsModel, menuItemChangeHandler, addButtonClickHandler);
headerController.render();
headerController.disableAddButton();

const eventCreatorCloseHandler = () => headerController.enableAddButton();

const tripController = new TripController(tripComponent, eventsModel, provider, eventCreatorCloseHandler);
tripController.renderLoadingMessage();

let isCriticalInfoLoaded = false;

const windowLoadHandler = () => navigator.serviceWorker.register(`/sw.js`).catch(() => {});

const windowOfflineHandler = () => {
  document.title += ` [offline]`;
};

const windowOnlineHandler = () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (isCriticalInfoLoaded && provider.isSyncNeeded) {
    provider.syncEvents()
      .then((events) => {
        eventsModel.setEvents(events);
        tripController.render();
        statisticsComponent.renderCharts(eventsModel.getAllEvents());
      });
  }
};

window.addEventListener(`load`, windowLoadHandler);
window.addEventListener(`offline`, windowOfflineHandler);
window.addEventListener(`online`, windowOnlineHandler);

Promise.all([
  provider.getDestinations(),
  provider.getOffers()
]).then(([destinations, typesToOffers]) => {
  isCriticalInfoLoaded = true;

  tripController.setDestinations(destinations);
  tripController.setTypesToOffers(typesToOffers);

  provider.getEvents()
    .then((events) => eventsModel.setEvents(events))
    .finally(() => {
      headerController.enableAddButton();
      tripController.render();
    });
}).catch(() => {
  tripController.renderErrorMessage();
});
