import {createElementFromTemplate, render} from "../utils/dom";
import {formatDate, formatISODate} from "../utils/date";

import AbstractComponent from "./abstract-component";

const createDayTemplate = (day) => {
  const {number, date} = day;

  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${number}</span>
        <time
          class="day__date"
          datetime="${formatISODate(date)}">
          ${formatDate(date)}
        </time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(day) {
    super();
    this._day = day;
  }

  getTemplate() {
    return createDayTemplate(this._day);
  }

  getElement() {
    if (!this._element) {
      this._element = super.getElement();

      const eventListElement = this._element.querySelector(`.trip-events__list`);

      this._day.eventComponents.forEach((eventComponent) => {
        const listItemElement = createElementFromTemplate(`<li class="trip-events__item"></li>`);

        render(listItemElement, eventComponent);
        eventListElement.appendChild(listItemElement);
      });
    }

    return this._element;
  }
}
