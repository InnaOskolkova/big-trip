import {compareDates} from "./utils";

import {createInfoTemplate} from "./components/info";
import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createSortTemplate} from "./components/sort";
import {createEditorTemplate} from "./components/editor";
import {createDayTemplate, createDayListTemplate} from "./components/day-list";
import {createEventTemplate} from "./components/event";

import {generateEvents} from "./mock/event";

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const mainElement = document.querySelector(`.trip-main`);
const controlsElement = mainElement.querySelector(`.trip-controls`);

render(mainElement, createInfoTemplate(), `afterbegin`);
render(controlsElement, createMenuTemplate());
render(controlsElement, createFilterTemplate());

const eventsElement = document.querySelector(`.trip-events`);

const events = generateEvents();

render(eventsElement, createSortTemplate());
render(eventsElement, createEditorTemplate(events[0]));
render(eventsElement, createDayListTemplate());

// Возможно, логика группировки событий по дням должна происходить внутри какого-либо компонента
const dayListElement = eventsElement.querySelector(`.trip-days`);

let currentEventAmount = 1;

let currentDate = events[1].beginDate;
let eventsPerCurrentDate = 0;

let dayCounter = 0;

const renderDay = () => {
  dayCounter++;

  const previousEventAmount = currentEventAmount;
  currentEventAmount += eventsPerCurrentDate;
  eventsPerCurrentDate = 1;

  const eventTemplates = events.slice(previousEventAmount, currentEventAmount)
    .map(createEventTemplate);

  render(dayListElement, createDayTemplate(dayCounter, currentDate, eventTemplates));
};


events.slice(currentEventAmount).forEach((event) => {
  const eventBeginDate = event.beginDate;

  if (compareDates(currentDate, eventBeginDate)) {
    eventsPerCurrentDate++;
    return;
  }

  renderDay();
  currentDate = eventBeginDate;
});

renderDay();
