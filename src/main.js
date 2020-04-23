import {RenderPosition} from "./const";

import {compareDates, render} from "./utils";

import InfoComponent from "./components/info";
import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import DayListComponent from "./components/day-list";
import DayComponent from "./components/day";
import EventComponent from "./components/event";
import EditorComponent from "./components/editor";

import {generateEvents} from "./mock/event";

const mainElement = document.querySelector(`.trip-main`);
const controlsElement = mainElement.querySelector(`.trip-controls`);
const eventListElement = document.querySelector(`.trip-events`);
const dayListElement = new DayListComponent().getElement();

render(mainElement, new InfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(controlsElement, new MenuComponent().getElement());
render(controlsElement, new FilterComponent().getElement());
render(eventListElement, new SortComponent().getElement());
render(eventListElement, dayListElement);

const linkEventToEditor = (event, editor) => {
  const eventElement = event.getElement();
  const editorElement = editor.getElement();
  const editButton = eventElement.querySelector(`.event__rollup-btn`);

  const editButtonClickHandler = () => eventElement.replaceWith(editorElement);
  const editorSubmitHandler = (evt) => {
    evt.preventDefault();
    editorElement.replaceWith(eventElement);
  };

  editButton.addEventListener(`click`, editButtonClickHandler);
  editorElement.addEventListener(`submit`, editorSubmitHandler);
};

const events = generateEvents();
const groupedByDateEvents = [];

let currentEventAmount = 0;
let currentDate = events[0].beginDate;
let eventsPerCurrentDate = 0;

events.forEach((event, i) => {
  const eventBeginDate = event.beginDate;

  if (compareDates(currentDate, eventBeginDate)) {
    eventsPerCurrentDate++;
  } else {
    const previousEventAmount = currentEventAmount;
    currentEventAmount += eventsPerCurrentDate;

    groupedByDateEvents.push(events.slice(previousEventAmount, currentEventAmount));

    currentDate = eventBeginDate;
    eventsPerCurrentDate = 1;
  }

  if (i === events.length - 1) {
    groupedByDateEvents.push(events.slice(currentEventAmount));
  }
});

const dayComponents = groupedByDateEvents.map((groupedEvents, i) => {
  const eventComponents = [];

  groupedEvents.forEach((event) => {
    const eventComponent = new EventComponent(event);
    linkEventToEditor(eventComponent, new EditorComponent(event));
    eventComponents.push(eventComponent);
  });

  return new DayComponent({
    number: i + 1,
    date: groupedEvents[0].beginDate,
    eventComponents
  });
});

dayComponents.forEach((dayComponent) => render(dayListElement, dayComponent.getElement()));
