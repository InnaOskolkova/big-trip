import {eventGroupsToEventTypes, EVENT_DESTINATIONS, EVENT_OFFERS} from "../const";

import {formatTime, formatFullDate} from "../utils/date";
import {getPreposition} from "../utils/text";

import AbstractComponent from "./abstract-component";

const createTypeMarkup = (type, isChecked) => {
  const lowerCaseType = type.toLowerCase();

  return (
    `<div class="event__type-item">
      <input
        class="event__type-input visually-hidden"
        id="event-type-${lowerCaseType}"
        type="radio"
        name="event-type"
        value="${lowerCaseType}"
        ${isChecked ? `checked` : ``}>
      <label
        class="event__type-label event__type-label--${lowerCaseType}"
        for="event-type-${lowerCaseType}">
        ${type}
      </label>
    </div>`
  );
};

const createGroupMarkup = (group, checkedType) => (
  `<fieldset class="event__type-group">
    <legend class="visually-hidden">${group}</legend>
    ${eventGroupsToEventTypes[group].map((type) => createTypeMarkup(type, type === checkedType)).join(``)}
  </fieldset>`
);

const createTypesMarkup = (checkedType) => (
  `<div class="event__type-list">
    ${Object.keys(eventGroupsToEventTypes).map((group) => createGroupMarkup(group, checkedType)).join(``)}
  </div>`
);

const createDestinationsMarkup = () => (
  `<datalist id="destination-list">
    ${EVENT_DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join(``)}
  </datalist>`
);

const createOfferMarkup = (offer, isChecked) => {
  // Вероятно, эта строка будет вычисляться иначе
  const dashedName = offer.name.split(` `).join(`-`);

  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${dashedName}"
        type="checkbox"
        name="event-offer-${dashedName}"
        ${isChecked ? `checked` : ``}>
      <label
        class="event__offer-label"
        for="event-offer-${dashedName}">
        <span class="event__offer-title">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

const createOffersMarkup = (checkedOffers) => (
  `<section class="event__section event__section--offers">
    <h3 class="event__section-title event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${EVENT_OFFERS.map((offer) => createOfferMarkup(offer, checkedOffers.includes(offer))).join(``)}
    </div>
  </section>`
);

const createPhotosMarkup = (photos) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``)}
    </div>
  </div>`
);

const createEditorTemplate = (event) => {
  const {type, destination, beginDate, endDate, price, offers, description, photos} = event;

  return (
    `<form class="event event--edit" action="#" method="post">

      <header class="event__header">

        <div class="event__type-wrapper">

          <label
            class="event__type event__type-btn"
            for="event-type-toggle">
            <span class="visually-hidden">Choose event type</span>
            <img
              class="event__type-icon"
              width="17" height="17"
              src="img/icons/${type.toLowerCase()}.png"
              alt="Event type icon">
          </label>
          <input
            class="event__type-toggle visually-hidden"
            id="event-type-toggle"
            type="checkbox">

          ${createTypesMarkup(type)}

        </div>

        <div class="event__field-group event__field-group--destination">
          <label
            class="event__label event__type-output"
            for="event-destination">
            ${type} ${getPreposition(type)}
          </label>
          <input
            class="event__input event__input--destination"
            id="event-destination"
            type="text"
            name="event-destination"
            value="${destination}"
            list="destination-list">
          ${createDestinationsMarkup()}
        </div>

        <div class="event__field-group event__field-group--time">
          <label
            class="visually-hidden"
            for="event-start-time">
            From
          </label>
          <input
            class="event__input event__input--time"
            id="event-start-time"
            type="text"
            name="event-start-time"
            value="${formatFullDate(beginDate)} ${formatTime(beginDate)}">

          &mdash;

          <label
            class="visually-hidden"
            for="event-end-time">
            To
          </label>
          <input
            class="event__input event__input--time"
            id="event-end-time"
            type="text"
            name="event-end-time"
            value="${formatFullDate(endDate)} ${formatTime(endDate)}">
        </div>

        <div class="event__field-group event__field-group--price">
          <label
            class="event__label"
            for="event-price">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input event__input--price"
            id="event-price"
            type="text"
            name="event-price"
            value="${price}">
        </div>

        <button
          class="event__save-btn btn btn--blue"
          type="submit">
          Save
        </button>

        <button
          class="event__reset-btn"
          type="reset">
          Cancel
        </button>

      </header>

      <section class="event__details">

        ${createOffersMarkup(offers)}

        <section class="event__section event__section--destination">
          <h3 class="event__section-title event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          ${createPhotosMarkup(photos)}
        </section>

      </section>

    </form>`
  );
};

export default class Editor extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEditorTemplate(this._event);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }
}
