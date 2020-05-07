// Служебные константы
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const ESC_KEY = `Escape`;

// Константы фильтров
export const FILTERS = [`everything`, `future`, `past`];

export const DEFAULT_FILTER = `everything`;

// Константы сортировки
export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const DEFAULT_SORT_TYPE = SortType.EVENT;

// Константы событий
export const eventGroupsToEventTypes = {
  transfer: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  activity: [`check-in`, `sightseeing`, `restaurant`]
};

export const eventGroupsToPrepositions = {transfer: `to`, activity: `in`};

// Этот список нужен только для моковых данных
export const EVENT_TYPES = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`
];

export const EVENT_MAX_RENDERED_OFFER_AMOUNT = 3;

export const EventViewMode = {
  DEFAULT: `default`,
  EDITOR: `editor`
};
