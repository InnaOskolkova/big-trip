import {RenderPosition} from "./const";

import {render} from "./utils/dom";

import EventsModel from "./models/events";

import InfoComponent from "./components/info";
import MenuComponent from "./components/menu";

import FilterController from "./controllers/filter";
import TripController from "./controllers/trip";

import {generateDestinations} from "./mock/destination";
import {generateOffers} from "./mock/offer";
import {generateEvents} from "./mock/event";

const mainElement = document.querySelector(`.trip-main`);
const controlsElement = mainElement.querySelector(`.trip-controls`);
const eventListElement = document.querySelector(`.trip-events__container`);

render(mainElement, new InfoComponent(), RenderPosition.AFTERBEGIN);
render(controlsElement, new MenuComponent());

const destinations = generateDestinations();
const typesToOffers = generateOffers();

const eventsModel = new EventsModel();
eventsModel.setEvents(generateEvents(destinations, typesToOffers));

const filterController = new FilterController(controlsElement, eventsModel);
filterController.render();

const tripController = new TripController(eventListElement, eventsModel, destinations, typesToOffers);
tripController.render();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  filterController.setDefaultType();
  tripController.createEvent();
});
