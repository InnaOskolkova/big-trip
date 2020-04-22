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

const events = generateEvents();

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

let currentEventAmount = 0;
let currentDate = events[0].beginDate;
let eventsPerCurrentDate = 0;
let dayCounter = 0;

const renderDay = () => {
  dayCounter++;

  const previousEventAmount = currentEventAmount;
  currentEventAmount += eventsPerCurrentDate;

  const eventComponents = [];

  events.slice(previousEventAmount, currentEventAmount).map((event) => {
    const eventComponent = new EventComponent(event);
    linkEventToEditor(eventComponent, new EditorComponent(event));
    eventComponents.push(eventComponent);
  });

  render(dayListElement, new DayComponent({
    number: dayCounter,
    date: currentDate,
    events: eventComponents
  }).getElement());
};

events.forEach((event) => {
  const eventBeginDate = event.beginDate;

  if (compareDates(currentDate, eventBeginDate)) {
    eventsPerCurrentDate++;
    return;
  }

  renderDay();
  currentDate = eventBeginDate;
  eventsPerCurrentDate = 1;
});

renderDay();
