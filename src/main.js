import {RenderPosition} from "./const";

import {
  groupBy,
  formatISODate,
  render,
  checkEscKey
} from "./utils";

import InfoComponent from "./components/info";
import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import NoEventsMessageComponent from "./components/no-events-message";
import SortComponent from "./components/sort";
import DayListComponent from "./components/day-list";
import DayComponent from "./components/day";
import EventComponent from "./components/event";
import EditorComponent from "./components/editor";

import {generateEvents} from "./mock/event";

const mainElement = document.querySelector(`.trip-main`);
const controlsElement = mainElement.querySelector(`.trip-controls`);

render(mainElement, new InfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(controlsElement, new MenuComponent().getElement());
render(controlsElement, new FilterComponent().getElement());

const events = generateEvents();

const linkEventToEditor = (event, editor) => {
  const eventElement = event.getElement();
  const editorElement = editor.getElement();
  const editButton = eventElement.querySelector(`.event__rollup-btn`);

  const editorKeydownHandler = (evt) => {
    if (checkEscKey(evt.key)) {
      evt.preventDefault();
      editorElement.replaceWith(eventElement);
      document.removeEventListener(`keydown`, editorKeydownHandler);
    }
  };

  const editButtonClickHandler = () => {
    eventElement.replaceWith(editorElement);
    document.addEventListener(`keydown`, editorKeydownHandler);
  };

  const editorSubmitHandler = (evt) => {
    evt.preventDefault();
    editorElement.replaceWith(eventElement);
    document.removeEventListener(`keydown`, editorKeydownHandler);
  };

  editButton.addEventListener(`click`, editButtonClickHandler);
  editorElement.addEventListener(`submit`, editorSubmitHandler);
};

const renderEvents = () => {
  const eventListElement = document.querySelector(`.trip-events`);

  if (!events.length) {
    render(eventListElement, new NoEventsMessageComponent().getElement());
    return;
  }

  const dayListElement = new DayListComponent().getElement();

  render(eventListElement, new SortComponent().getElement());
  render(eventListElement, dayListElement);

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
};

renderEvents();
