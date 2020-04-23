import {RenderPosition} from "./const";

import {
  groupBy,
  formatISODate,
  render
} from "./utils";

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
const groupedByDateEvents = groupBy(events, (event) => formatISODate(event.beginDate));

Object.entries(groupedByDateEvents).forEach(([dateString, groupedEvents], i) => {
  const eventComponents = [];

  groupedEvents.forEach((event) => {
    const eventComponent = new EventComponent(event);
    linkEventToEditor(eventComponent, new EditorComponent(event));
    eventComponents.push(eventComponent);
  });

  render(dayListElement, new DayComponent({
    number: i + 1,
    date: new Date(dateString),
    eventComponents
  }).getElement());
});
