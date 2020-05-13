import AbstractComponent from "./abstract-component";

const createFilterMarkup = (filter) => {
  const {name, counter, isChecked} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        class="trip-filters__filter-input visually-hidden"
        id="filter-${name}"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isChecked ? `checked` : ``}
        ${!counter ? `disabled` : ``}>
      <label
        class="trip-filters__filter-label"
        for="filter-${name}">
        ${name}
      </label>
    </div>`
  );
};

const createFilterTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">

    <h2 class="visually-hidden">Filter events</h2>

    ${filters.map(createFilterMarkup).join(``)}

    <button
      class="visually-hidden"
      type="submit">
      Accept filter
    </button>

  </form>`
);

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => handler(evt.target.value));
  }
}
