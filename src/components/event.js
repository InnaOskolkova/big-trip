import {EVENT_MAX_RENDERED_OFFER_AMOUNT} from "../const";

import {
  getPreposition,
  formatTime,
  formatDuration,
  createElementFromTemplate
} from "../utils";

const createOfferMarkup = (offer) => (
  `<li class="event__offer">
    <span class="event__offer-title">${offer.name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`
);

const createOffersMarkup = (offers) => (
  `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${offers.slice(0, EVENT_MAX_RENDERED_OFFER_AMOUNT).map(createOfferMarkup).join(``)}
  </ul>`
);

const createEventTemplate = (event) => {
  const {type, destination, beginDate, endDate, price, offers} = event;

  return (
    `<div class="event">

      <div class="event__type">
        <img
          class="event__type-icon"
          width="42" height="42"
          src="img/icons/${type.toLowerCase()}.png"
          alt="Event type icon">
      </div>

      <h3 class="event__title">${type} ${getPreposition(type)} ${destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time
            class="event__start-time"
            datetime="${beginDate.toISOString()}">
            ${formatTime(beginDate)}
          </time>
          &mdash;
          <time
            class="event__end-time"
            datetime="${endDate.toISOString()}">
            ${formatTime(endDate)}
          </time>
        </p>
        <p class="event__duration">${formatDuration(beginDate, endDate)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      ${offers.length ? createOffersMarkup(offers) : ``}

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>

    </div>`
  );
};

export default class Event {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
