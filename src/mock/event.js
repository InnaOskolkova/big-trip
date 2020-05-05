import {MILLISECONDS_PER_HOUR, MILLISECONDS_PER_DAY, EVENT_TYPES} from "../const";

import {
  getRandomBoolean,
  getRandomIntegerFromRangeIncludingMax,
  getRandomIntegerIncludingMax,
  getRandomElement,
  getRandomElements
} from "../utils/common";

const EVENT_AMOUNT = 20;

const EventDurationLimit = {
  MIN: MILLISECONDS_PER_HOUR / 2,
  MAX: MILLISECONDS_PER_DAY * 2
};

const EVENT_MAX_PRICE = 1000;

const generateEvent = (type, destination, beginDate, endDate, offers) => ({
  type,
  destination,
  beginDate,
  endDate,
  price: getRandomIntegerIncludingMax(EVENT_MAX_PRICE),
  isFavorite: getRandomBoolean(),
  offers
});

export const generateEvents = (destinations, typesToOffers) => {
  let beginTime = Date.now();

  return new Array(EVENT_AMOUNT).fill(``).map(() => {
    const type = getRandomElement(EVENT_TYPES);
    const destination = getRandomElement(destinations);
    const offers = getRandomElements(typesToOffers[type]);

    const duration = getRandomIntegerFromRangeIncludingMax(EventDurationLimit.MIN, EventDurationLimit.MAX);

    const beginDate = new Date(beginTime);
    const endDate = new Date(beginTime + duration);

    beginTime += duration;

    return generateEvent(type, destination, beginDate, endDate, offers);
  });
};
