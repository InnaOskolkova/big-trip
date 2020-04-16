import {formatDate} from "../utils";

export const createDayTemplate = (counter, date, eventTemplates) => {
  // Обнуление часов, минут, секунд, миллисекунд без изменения исходного объекта
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return (
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time
          class="day__date"
          datetime="${date.toISOString()}">
          ${formatDate(date)}
        </time>
      </div>
      <ul class="trip-events__list">
        ${eventTemplates.map((template) => `<li class="trip-events__item">${template}</li>`).join(``)}
      </ul>
    </li>`
  );
};

export const createDayListTemplate = () => `<ul class="trip-days"></ul>`;
