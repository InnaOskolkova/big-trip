import {FILTERS, DEFAULT_FILTER} from "../const";

import AbstractComponent from "./abstract-component";

const createFilterMarkup = (filter, isChecked) => (
  `<div class="trip-filters__filter">
    <input
      class="trip-filters__filter-input visually-hidden"
      id="filter-${filter}"
      type="radio"
      name="trip-filter"
      value="${filter}"
      ${isChecked ? `checked` : ``}>
    <label
      class="trip-filters__filter-label"
      for="filter-${filter}">
      ${filter}
    </label>
  </div>`
);

const createFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">

    <h2 class="visually-hidden">Filter events</h2>

    ${FILTERS.map((filter) => createFilterMarkup(filter, filter === DEFAULT_FILTER)).join(``)}

    <button
      class="visually-hidden"
      type="submit">
      Accept filter
    </button>

  </form>`
);

export default class Filter extends AbstractComponent {
  getTemplate() {
    return createFilterTemplate();
  }
}
