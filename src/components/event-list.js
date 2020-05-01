import AbstractComponent from "./abstract-component";

const createEventListTemplate = () => `<ul class="trip-days"></ul>`;

export default class EventList extends AbstractComponent {
  getTemplate() {
    return createEventListTemplate();
  }

  clear() {
    this.getElement().innerHTML = ``;
  }
}
