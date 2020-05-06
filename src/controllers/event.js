import {EventViewMode} from "../const";

import {replace} from "../utils/dom";
import {checkEscKey} from "../utils/keyboard";

import EventComponent from "../components/event";
import EditorComponent from "../components/editor";

export default class EventController {
  constructor(event, destinations, typesToOffers, container, dataChangeHandler, viewChangeHandler) {
    this._event = event;
    this._eventComponent = null;
    this._editorComponent = null;

    this._destinations = destinations;
    this._typesToOffers = typesToOffers;

    this._container = container;

    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._viewMode = EventViewMode.DEFAULT;

    this._editButtonClickHandler = this._editButtonClickHandler.bind(this);
    this._editorKeydownHandler = this._editorKeydownHandler.bind(this);
    this._editorSubmitHandler = this._editorSubmitHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
  }

  render() {
    const oldEventComponent = this._eventComponent;
    const oldEditorComponent = this._editorComponent;

    this._eventComponent = new EventComponent(this._event);
    this._editorComponent = new EditorComponent(this._event, this._destinations, this._typesToOffers);

    this._eventComponent.setEditButtonClickHandler(this._editButtonClickHandler);
    this._editorComponent.setSubmitHandler(this._editorSubmitHandler);
    this._editorComponent.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    this._editorComponent.setCloseButtonClickHandler(this._closeButtonClickHandler);

    if (oldEventComponent) {
      replace(oldEventComponent, this._eventComponent);
      replace(oldEditorComponent, this._editorComponent);
    } else {
      this._container.renderEvent(this._eventComponent);
    }
  }

  setDefaultView() {
    if (this._viewMode !== EventViewMode.DEFAULT) {
      this._replaceEditorWithEvent();
    }
  }

  _replaceEventWithEditor() {
    this._viewChangeHandler();
    this._viewMode = EventViewMode.EDITOR;
    replace(this._eventComponent, this._editorComponent);
    document.addEventListener(`keydown`, this._editorKeydownHandler);
  }

  _replaceEditorWithEvent() {
    this._editorComponent.reset();
    this._viewMode = EventViewMode.DEFAULT;
    replace(this._editorComponent, this._eventComponent);
    document.removeEventListener(`keydown`, this._editorKeydownHandler);
  }

  _editButtonClickHandler() {
    this._replaceEventWithEditor();
  }

  _editorKeydownHandler(evt) {
    if (checkEscKey(evt.key)) {
      evt.preventDefault();
      this._replaceEditorWithEvent();
    }
  }

  _editorSubmitHandler(evt) {
    evt.preventDefault();
    this._replaceEditorWithEvent();
  }

  _favoriteButtonClickHandler() {
    const oldEvent = this._event;
    this._event = Object.assign({}, oldEvent, {isFavorite: !oldEvent.isFavorite});
    this._dataChangeHandler(oldEvent, this._event);
    this.render();
  }

  _closeButtonClickHandler() {
    this._replaceEditorWithEvent();
  }
}
