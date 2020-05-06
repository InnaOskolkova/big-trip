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

export const replaceElements = (array, oldElement, newElement) => {
  array[array.indexOf(oldElement)] = newElement;
};
