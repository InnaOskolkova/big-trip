import {groupBy} from "../utils/common";
import {render, replace} from "../utils/dom";
import {checkEscKey} from "../utils/keyboard";
import {formatISODate} from "../utils/date";

import NoEventsMessageComponent from "../components/no-events-message";
import SortComponent from "../components/sort";
import DayListComponent from "../components/day-list";
import DayComponent from "../components/day";
import EventComponent from "../components/event";
import EditorComponent from "../components/editor";

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

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsMessageComponent = new NoEventsMessageComponent();
    this._sortComponent = new SortComponent();
    this._dayListComponent = new DayListComponent();
  }

  render(events) {
    if (!events.length) {
      render(this._container, this._noEventsMessageComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._dayListComponent);

    const groupedByDateEvents = groupBy(events, (event) => formatISODate(event.beginDate));

    Object.entries(groupedByDateEvents).forEach(([dateString, groupedEvents], i) => {
      const eventComponents = [];

      groupedEvents.forEach((event) => {
        const eventComponent = new EventComponent(event);
        linkEventToEditor(eventComponent, new EditorComponent(event));
        eventComponents.push(eventComponent);
      });

      render(this._dayListComponent, new DayComponent({
        number: i + 1,
        date: new Date(dateString),
        eventComponents
      }));
    });
  }
}
