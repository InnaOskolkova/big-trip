import {RenderPosition} from "./const";

import {groupBy} from "./utils/common";
import {render, replace} from "./utils/dom";
import {checkEscKey} from "./utils/keyboard";
import {formatISODate} from "./utils/date";

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

render(mainElement, new InfoComponent(), RenderPosition.AFTERBEGIN);
render(controlsElement, new MenuComponent());
render(controlsElement, new FilterComponent());

const events = generateEvents();

const linkEventToEditor = (eventComponent, editorComponent) => {
  const editorKeydownHandler = (evt) => {
    if (checkEscKey(evt.key)) {
      evt.preventDefault();
      replace(editorComponent, eventComponent);
      document.removeEventListener(`keydown`, editorKeydownHandler);
    }
  };

  const editButtonClickHandler = () => {
    replace(eventComponent, editorComponent);
    document.addEventListener(`keydown`, editorKeydownHandler);
  };

  const editorSubmitHandler = (evt) => {
    evt.preventDefault();
    replace(editorComponent, eventComponent);
    document.removeEventListener(`keydown`, editorKeydownHandler);
  };

  eventComponent.setEditButtonClickHandler(editButtonClickHandler);
  editorComponent.setSubmitHandler(editorSubmitHandler);
};

const renderEvents = () => {
  const eventListElement = document.querySelector(`.trip-events`);

  if (!events.length) {
    render(eventListElement, new NoEventsMessageComponent());
    return;
  }

  const dayListComponent = new DayListComponent();
  const dayListElement = dayListComponent.getElement();

  render(eventListElement, new SortComponent());
  render(eventListElement, dayListComponent);

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
    }));
  });
};

renderEvents();
