import {
  formatDate,
  formatISODate,
  createElementFromTemplate,
  render
} from "../utils";

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

export default class Day {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._day);
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());

      const eventListElement = this._element.querySelector(`.trip-events__list`);

      this._day.events.forEach((event) => {
        const listItemElement = createElementFromTemplate(`<li class="trip-events__item"></li>`);

        render(listItemElement, event.getElement());
        render(eventListElement, listItemElement);
      });
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
