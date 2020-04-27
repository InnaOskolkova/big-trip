import {RenderPosition} from "./const";

import {render} from "./utils/dom";

import InfoComponent from "./components/info";
import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";

import TripController from "./controllers/trip";

import {generateEvents} from "./mock/event";

const mainElement = document.querySelector(`.trip-main`);
const controlsElement = mainElement.querySelector(`.trip-controls`);
const eventListElement = document.querySelector(`.trip-events`);

render(mainElement, new InfoComponent(), RenderPosition.AFTERBEGIN);
render(controlsElement, new MenuComponent());
render(controlsElement, new FilterComponent());

const events = generateEvents();

const tripController = new TripController(eventListElement);
tripController.render(events);
