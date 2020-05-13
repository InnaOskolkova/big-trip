import {FilterType, DEFAULT_FILTER_TYPE} from "../const";

import {render, replace} from "../utils/dom";
import {countEventsForEachFilter} from "../utils/filter";

import FilterComponent from "../components/filter";

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._filterType = DEFAULT_FILTER_TYPE;
    this._filterComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._eventsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const oldFilterComponent = this._filterComponent;

    const filtersToCounters = countEventsForEachFilter(this._eventsModel.getAllEvents());

    const filters = Object.values(FilterType).map((filterType) => ({
      name: filterType,
      counter: filtersToCounters[filterType],
      isChecked: filterType === this._filterType
    }));

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setTypeChangeHandler(this._filterTypeChangeHandler);

    if (oldFilterComponent) {
      replace(oldFilterComponent, this._filterComponent);
    } else {
      render(this._container, this._filterComponent);
    }
  }

  _dataChangeHandler() {
    this.render();
  }

  _filterTypeChangeHandler(filterType) {
    this._filterType = filterType;
    this._eventsModel.setFilterType(this._filterType);
  }
}
