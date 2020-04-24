import {createElementFromTemplate} from "../utils";

const createMessageTemplate = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoEventsMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMessageTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
