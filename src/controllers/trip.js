import {DEFAULT_SORT_TYPE} from "../const";

import {render, replace} from "../utils/dom";
import {checkEscKey} from "../utils/keyboard";
import {groupEventsByBeginDate, sortEvents} from "../utils/event";

import NoEventsMessageComponent from "../components/no-events-message";
import SortComponent from "../components/sort";
import EventListComponent from "../components/event-list";
import EventGroupComponent from "../components/event-group";
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
    this._eventListComponent = new EventListComponent();
  }

  render(events) {
    if (!events.length) {
      render(this._container, this._noEventsMessageComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._eventListComponent);

    this._renderGroupedEvents(groupEventsByBeginDate(events));

    const sortTypeChangeHandler = (sortType) => {
      this._eventListComponent.clear();

      if (sortType === DEFAULT_SORT_TYPE) {
        this._renderGroupedEvents(groupEventsByBeginDate(events));
      } else {
        this._renderSortedEvents(sortEvents(events, sortType));
      }
    };

    this._sortComponent.setTypeChangeHandler(sortTypeChangeHandler);
  }

  _renderGroupedEvents(groupedEvents) {
    Object.entries(groupedEvents).forEach(([dateString, events], i) => {
      render(this._eventListComponent, new EventGroupComponent({
        number: i + 1,
        date: new Date(dateString),
        eventComponents: this._createEventComponents(events)
      }));
    });
  }

  _renderSortedEvents(sortedEvents) {
    render(this._eventListComponent, new EventGroupComponent({
      eventComponents: this._createEventComponents(sortedEvents)
    }));
  }

  _createEventComponents(events) {
    const eventComponents = [];

    events.forEach((event) => {
      const eventComponent = new EventComponent(event);
      linkEventToEditor(eventComponent, new EditorComponent(event));
      eventComponents.push(eventComponent);
    });

    return eventComponents;
  }
}
