import {
  SORTS,
  DEFAULT_SORT
} from "../const";

const createSortMarkup = (sort, isChecked) => (
  `<div class="trip-sort__item trip-sort__item--${sort}">
    <input
      class="trip-sort__input visually-hidden"
      id="sort-${sort}"
      type="radio"
      name="trip-sort"
      value="sort-${sort}"
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

export const createSortTemplate = () => (
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">

    <span class="trip-sort__item trip-sort__item--day">Day</span>

    ${SORTS.map((sort) => createSortMarkup(sort, sort === DEFAULT_SORT)).join(``)}

    <span class="trip-sort__item trip-sort__item--offers">Offers</span>

  </form>`
);
