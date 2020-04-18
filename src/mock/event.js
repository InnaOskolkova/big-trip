import {
  EVENT_TYPES,
  EVENT_DESTINATIONS,
  EventDurationLimit,
  EVENT_MAX_PRICE,
  EVENT_OFFERS,
  EVENT_DESCRIPTION,
  EVENT_MAX_DESCRIPTION_LENGTH,
  EventPhotoAmountLimit,
  EVENT_AMOUNT
} from "../const";

import {
  getRandomIntegerFromRangeIncludingMax,
  getRandomIntegerIncludingMax,
  getRandomElement,
  getRandomElements,
  splitTextIntoSentences
} from "../utils";

const generateDescription = () => {
  const sentences = splitTextIntoSentences(EVENT_DESCRIPTION);
  const randomSentences = getRandomElements(sentences);

  return randomSentences.length ?
    randomSentences.slice(0, EVENT_MAX_DESCRIPTION_LENGTH).join(` `) :
    getRandomElement(sentences);
};

const generatePhotos = () => {
  return new Array(getRandomIntegerFromRangeIncludingMax(EventPhotoAmountLimit.MIN, EventPhotoAmountLimit.MAX))
    .fill(``).map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const generateEvent = (beginDate, endDate) => ({
  type: getRandomElement(EVENT_TYPES),
  destination: getRandomElement(EVENT_DESTINATIONS),
  beginDate,
  endDate,
  price: getRandomIntegerIncludingMax(EVENT_MAX_PRICE),
  offers: getRandomElements(EVENT_OFFERS),
  description: generateDescription(),
  photos: generatePhotos()
});

export const generateEvents = () => {
  let beginTime = Date.now();

  return new Array(EVENT_AMOUNT).fill(``).map(() => {
    const duration = getRandomIntegerFromRangeIncludingMax(EventDurationLimit.MIN, EventDurationLimit.MAX);
    const event = generateEvent(new Date(beginTime), new Date(beginTime + duration));
    beginTime += duration;
    return event;
  });
};
