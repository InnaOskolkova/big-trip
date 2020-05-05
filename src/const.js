// Служебные константы
export const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

export const MILLISECONDS_PER_MINUTE = 60000;

export const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;

export const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;

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
