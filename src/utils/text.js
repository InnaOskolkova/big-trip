import {eventGroupsToEventTypes, eventGroupsToPrepositions} from "../const";

export const splitTextIntoSentences = (text) => text
  .split(`.`).slice(0, -1).map((sentence) => `${sentence.trim()}.`);

export const getPreposition = (eventType) => {
  const eventGroup = Object.keys(eventGroupsToEventTypes)
    .find((group) => eventGroupsToEventTypes[group].includes(eventType));

  return eventGroupsToPrepositions[eventGroup];
};
