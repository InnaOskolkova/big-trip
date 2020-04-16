// Служебные константы
export const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

export const MILLISECONDS_PER_MINUTE = 60000;

export const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;

export const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;

// Константы фильтров
export const FILTERS = [`everything`, `future`, `past`];

export const DEFAULT_FILTER = `everything`;

// Константы сортировки
export const SORTS = [`event`, `time`, `price`];

export const DEFAULT_SORT = `event`;

// Константы событий
export const eventGroupsToEventTypes = {
  Transfer: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  Activity: [`Check-in`, `Sightseeing`, `Restaurant`]
};

export const eventGroupsToPrepositions = {Transfer: `to`, Activity: `in`};

// Этот список нужен только для моковых данных
export const EVENT_TYPES = [
  `Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`
];

export const EVENT_DESTINATIONS = [`Amsterdam`, `Berlin`, `Oslo`, `Rome`];

export const EventDurationLimit = {
  MIN: MILLISECONDS_PER_HOUR / 2,
  MAX: MILLISECONDS_PER_DAY * 2
};

export const EVENT_MAX_PRICE = 1000;

export const EVENT_OFFERS = [
  {name: `add tomato`, price: 50},
  {name: `add potato`, price: 100},
  {name: `add tea`, price: 150},
  {name: `add coffee`, price: 200},
  {name: `add cake`, price: 250}
];

export const EVENT_MAX_RENDERED_OFFER_AMOUNT = 3;

export const EVENT_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const EVENT_MAX_DESCRIPTION_LENGTH = 5;

export const EventPhotoAmountLimit = {MIN: 1, MAX: 6};

export const EVENT_AMOUNT = 20;
