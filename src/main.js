import {createInfoTemplate} from "./components/info";
import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createSortTemplate} from "./components/sort";
import {createEditorTemplate} from "./components/editor";
import {createDayListTemplate} from "./components/day-list";
import {createEventTemplate} from "./components/event";

const EVENT_AMOUNT = 3;

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const mainElement = document.querySelector(`.trip-main`);
const controlsElement = mainElement.querySelector(`.trip-controls`);

render(mainElement, createInfoTemplate(), `afterbegin`);
render(controlsElement, createMenuTemplate());
render(controlsElement, createFilterTemplate());

const eventsElement = document.querySelector(`.trip-events`);

render(eventsElement, createSortTemplate());
render(eventsElement, createEditorTemplate());
render(eventsElement, createDayListTemplate());

const dayElement = eventsElement.querySelector(`.day`);

const eventListTemplate = (
  `<ul class="trip-events__list">
    ${`<li class="trip-events__item">${createEventTemplate()}</li>`.repeat(EVENT_AMOUNT)}
  </ul>`
);

render(dayElement, eventListTemplate);
