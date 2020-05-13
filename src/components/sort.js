import {SortType, DEFAULT_SORT_TYPE} from "../const";

import AbstractComponent from "./abstract-component";

const createSortMarkup = (sort, isChecked) => (
  `<div class="trip-sort__item trip-sort__item--${sort}">
    <input
      class="trip-sort__input visually-hidden"
      id="sort-${sort}"
      type="radio"
      name="trip-sort"
      value="${sort}"
      ${isChecked ? `checked` : ``}>
    <label
      class="trip-sort__btn"
      for="sort-${sort}">
      ${sort}
      <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
        <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
      </svg>
    </label>
  </div>`
);

const createSortTemplate = () => (
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">

    <span class="trip-sort__item trip-sort__item--day">Day</span>

    ${Object.values(SortType).map((sort) => createSortMarkup(sort, sort === DEFAULT_SORT_TYPE)).join(``)}

    <span class="trip-sort__item trip-sort__item--offers">Offers</span>

  </form>`
);

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._typeChangeHandler = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = super.getElement();
      const dayItemElement = this._element.querySelector(`.trip-sort__item--day`);

      this._element.addEventListener(`change`, (evt) => {
        const type = evt.target.value;

        dayItemElement.textContent = type === SortType.EVENT ? `Day` : ``;

        if (this._typeChangeHandler) {
          this._typeChangeHandler(type);
        }
      });
    }

    return this._element;
  }

  setDefaultType() {
    this.getElement().querySelector(`[value="${DEFAULT_SORT_TYPE}"]`).checked = true;
  }

  setTypeChangeHandler(handler) {
    this._typeChangeHandler = handler;
  }
}
