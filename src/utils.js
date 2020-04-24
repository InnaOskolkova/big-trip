import {
  MONTHS,
  MILLISECONDS_PER_MINUTE,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_DAY,
  RenderPosition,
  ESC_KEY,
  eventGroupsToEventTypes,
  eventGroupsToPrepositions
} from "./const";

// Служебные функции для работы с числами и списками
export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomIntegerFromRange = (min, max) => min + Math.floor(Math.random() * (max - min));

export const getRandomIntegerFromRangeIncludingMax = (min, max) => getRandomIntegerFromRange(min, max + 1);

export const getRandomInteger = (max) => getRandomIntegerFromRange(0, max);

export const getRandomIntegerIncludingMax = (max) => getRandomInteger(max + 1);

export const getRandomElement = (array) => array[getRandomInteger(array.length)];

export const getRandomElements = (array) => array.filter(getRandomBoolean);

export const groupBy = (array, groupCalculator) => array.reduce((groups, element) => {
  const group = groupCalculator(element);

  if (!groups[group]) {
    groups[group] = [];
  }

  groups[group].push(element);

  return groups;
}, {});

// Служебные функции для работы с текстом
export const splitTextIntoSentences = (text) => text
  .split(`.`).slice(0, -1).map((sentence) => `${sentence.trim()}.`);

// Функция вычисления предлога
// Возможно, для более удобной работы с предлогами нужно будет изменить структуры данных
export const getPreposition = (eventType) => {
  const eventGroup = Object.keys(eventGroupsToEventTypes)
    .find((group) => eventGroupsToEventTypes[group].includes(eventType));

  return eventGroupsToPrepositions[eventGroup];
};

// Служебные функции для работы с датами
const formatDateUnit = (unit) => String(unit).slice(-2).padStart(2, `0`);

export const formatTime = (date) => `${formatDateUnit(date.getHours())}:${formatDateUnit(date.getMinutes())}`;

export const formatDate = (date) => `${MONTHS[date.getMonth()]} ${date.getDate()}`;

export const formatFullDate = (date) => (
  `${
    formatDateUnit(date.getDate())
  }/${
    formatDateUnit(date.getMonth() + 1)
  }/${
    formatDateUnit(date.getFullYear())
  }`
);

export const formatISODate = (date) => (
  `${
    date.getFullYear()
  }-${
    formatDateUnit(date.getMonth() + 1)
  }-${
    formatDateUnit(date.getDate())
  }`
);

export const formatDuration = (beginDate, endDate) => {
  let duration = endDate - beginDate;

  const dayAmount = Math.floor(duration / MILLISECONDS_PER_DAY);
  duration %= MILLISECONDS_PER_DAY;

  const hourAmount = Math.floor(duration / MILLISECONDS_PER_HOUR);
  duration %= MILLISECONDS_PER_HOUR;

  const minuteAmount = Math.floor(duration / MILLISECONDS_PER_MINUTE);

  return (
    `${
      dayAmount ? `${formatDateUnit(dayAmount)}D` : ``
    } ${
      hourAmount ? `${formatDateUnit(hourAmount)}H` : ``
    } ${
      minuteAmount ? `${formatDateUnit(minuteAmount)}M` : ``
    }`
  ).trim();
};

// Служебные функции для работы с элементами DOM
export const createElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, position = RenderPosition.BEFOREEND) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Служебные функции для работы с клавиатурой
export const checkEscKey = (key) => key === ESC_KEY;
