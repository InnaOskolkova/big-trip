import {eventTypesToEmoji, EventGroup, eventGroupsToEventTypes, eventGroupsToPrepositions} from "../const";

export const upperCaseFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

export const replaceChars = (string, oldChar, newChar) => string.split(oldChar).join(newChar);

export const checkIfNonNegativeNumericString = (string) => !isNaN(string) && parseFloat(string) >= 0;

export const getPreposition = (eventType) => {
  const eventGroup = Object.values(EventGroup)
    .find((group) => eventGroupsToEventTypes[group].includes(eventType));

  return eventGroupsToPrepositions[eventGroup];
};

export const getChartLabel = (eventType) => `${eventTypesToEmoji[eventType]} ${eventType.toUpperCase()}`;
