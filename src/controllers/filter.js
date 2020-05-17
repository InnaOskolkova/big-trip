import {DEFAULT_FILTER_TYPE} from "../const";

import {render} from "../utils/dom";

import FilterComponent from "../components/filter";

export default class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._filterComponent = null;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  render() {
    this._filterComponent = new FilterComponent();
    this._filterComponent.setTypeChangeHandler(this._filterTypeChangeHandler);
    render(this._container, this._filterComponent);
  }

  setDefaultType() {
    this._filterComponent.setDefaultType();
    this._eventsModel.setFilterType(DEFAULT_FILTER_TYPE);
  }

  _filterTypeChangeHandler(filterType) {
    this._eventsModel.setFilterType(filterType);
  }
}
