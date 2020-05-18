import {EVENT_TYPES} from "../const";

import {
  getRandomBoolean,
  getRandomIntegerFromRangeIncludingMax,
  getRandomIntegerIncludingMax,
  getRandomElement,
  getRandomElements
} from "../utils/common";

const EVENT_AMOUNT = 10;

const MILLISECONDS_PER_MINUTE = 60000;

const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;

const EventDurationLimit = {
  MIN: MILLISECONDS_PER_HOUR / 2,
  MAX: MILLISECONDS_PER_HOUR * 10
};

const EVENT_MAX_PRICE = 1000;

const generateEvent = (id, type, destination, beginDate, endDate, offers) => ({
  id,
  type,
  destination,
  beginDate,
  endDate,
  price: getRandomIntegerIncludingMax(EVENT_MAX_PRICE),
  isFavorite: getRandomBoolean(),
  offers
});

export const generateEvents = (destinations, typesToOffers) => {
  let currentEventAmount = 0;
  let beginTime = Date.now();

  return new Array(EVENT_AMOUNT).fill(``).map(() => {
    currentEventAmount++;

    const type = getRandomElement(EVENT_TYPES);
    const destination = getRandomElement(destinations);
    const offers = getRandomElements(typesToOffers[type]);

    const duration = getRandomIntegerFromRangeIncludingMax(EventDurationLimit.MIN, EventDurationLimit.MAX);

    const beginDate = new Date(beginTime);
    const endDate = new Date(beginTime + duration);

    beginTime += duration;

    return generateEvent(currentEventAmount, type, destination, beginDate, endDate, offers);
  });
};
