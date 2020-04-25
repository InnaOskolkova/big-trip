import AbstractComponent from "./abstract-component";

const createDayListTemplate = () => `<ul class="trip-days"></ul>`;

export default class DayList extends AbstractComponent {
  getTemplate() {
    return createDayListTemplate();
  }
}
