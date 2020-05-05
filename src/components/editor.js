import {eventGroupsToEventTypes} from "../const";

import {formatTime, formatFullDate} from "../utils/date";
import {upperCaseFirstLetter, getPreposition, replaceChars} from "../utils/text";

import AbstractComponent from "./abstract-component";

const createTypeItemMarkup = (type, isChecked) => (
  `<div class="event__type-item">
    <input
      class="event__type-input visually-hidden"
      id="event-type-${type}"
      type="radio"
      name="event-type"
      value="${type}"
      ${isChecked ? `checked` : ``}>
    <label
      class="event__type-label event__type-label--${type}"
      for="event-type-${type}">
      ${upperCaseFirstLetter(type)}
    </label>
  </div>`
);

const createTypeGroupMarkup = (group, checkedType) => (
  `<fieldset class="event__type-group">
    <legend class="visually-hidden">${upperCaseFirstLetter(group)}</legend>
    ${eventGroupsToEventTypes[group].map((type) => createTypeItemMarkup(type, type === checkedType)).join(``)}
  </fieldset>`
);

const createTypeListMarkup = (checkedType) => (
  `<div class="event__type-list">
    ${Object.keys(eventGroupsToEventTypes).map((group) => createTypeGroupMarkup(group, checkedType)).join(``)}
  </div>`
);

const createTypeMarkup = (checkedType) => (
  `<div class="event__type-wrapper">

    <label
      class="event__type event__type-btn"
      for="event-type-toggle">
      <span class="visually-hidden">Choose event type</span>
      <img
        class="event__type-icon"
        width="17" height="17"
        src="img/icons/${checkedType}.png"
        alt="Event type icon">
    </label>
    <input
      class="event__type-toggle visually-hidden"
      id="event-type-toggle"
      type="checkbox">

    ${createTypeListMarkup(checkedType)}

  </div>`
);

const createDestinationListMarkup = (destinations) => (
  `<datalist id="destination-list">
    ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join(``)}
  </datalist>`
);

const createDestinationMarkup = (destinations, checkedDestination, type) => (
  `<div class="event__field-group event__field-group--destination">

    <label
      class="event__label event__type-output"
      for="event-destination">
      ${upperCaseFirstLetter(type)} ${getPreposition(type)}
    </label>
    <input
      class="event__input event__input--destination"
      id="event-destination"
      type="text"
      name="event-destination"
      value="${checkedDestination.name}"
      list="destination-list">

    ${createDestinationListMarkup(destinations)}

  </div>`
);

const createDatesMarkup = (beginDate, endDate) => (
  `<div class="event__field-group event__field-group--time">

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

  </div>`
);

const createPriceMarkup = (price) => (
  `<div class="event__field-group event__field-group--price">
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
  </div>`
);

const createOfferMarkup = (offer, isChecked) => {
  const dashedOfferName = replaceChars(offer.name, ` `, `-`);

  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${dashedOfferName}"
        type="checkbox"
        name="event-offer-${dashedOfferName}"
        ${isChecked ? `checked` : ``}>
      <label
        class="event__offer-label"
        for="event-offer-${dashedOfferName}">
        <span class="event__offer-title">${offer.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
};

const createOffersMarkup = (availableOffers, checkedOffers) => {
  if (!availableOffers.length) {
    return ``;
  }

  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${availableOffers.map((offer) => createOfferMarkup(offer, checkedOffers.includes(offer))).join(``)}
      </div>
    </section>`
  );
};

const createPhotosMarkup = (photos) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.alt}">`).join(``)}
    </div>
  </div>`
);

const createDestinationInfoMarkup = (destination) => {
  const {description, photos} = destination;

  if (!description && !photos.length) {
    return ``;
  }

  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      ${description ? `<p class="event__destination-description">${description}</p>` : ``}
      ${photos.length ? createPhotosMarkup(photos) : ``}
    </section>`
  );
};

const createDetailsMarkup = (destination, availableOffers, checkedOffers) => {
  const offersMarkup = createOffersMarkup(availableOffers, checkedOffers);
  const destinationInfoMarkup = createDestinationInfoMarkup(destination);

  if (!offersMarkup && !destinationInfoMarkup) {
    return ``;
  }

  return (
    `<section class="event__details">
      ${offersMarkup}
      ${destinationInfoMarkup}
    </section>`
  );
};

const createEditorTemplate = (event, parameters) => {
  const {type, destination, beginDate, endDate, price, offers} = event;
  const {destinations, availableOffers} = parameters;

  return (
    `<form class="event event--edit" action="#" method="post">

      <header class="event__header">

        ${createTypeMarkup(type)}
        ${createDestinationMarkup(destinations, destination, type)}
        ${createDatesMarkup(beginDate, endDate)}
        ${createPriceMarkup(price)}

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

      ${createDetailsMarkup(destination, availableOffers, offers)}

    </form>`
  );
};

export default class Editor extends AbstractComponent {
  constructor(event, destinations, typesToOffers) {
    super();

    this._event = event;
    this._destinations = destinations;
    this._typesToOffers = typesToOffers;
  }

  getTemplate() {
    return createEditorTemplate(this._event, {
      destinations: this._destinations,
      availableOffers: this._typesToOffers[this._event.type]
    });
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }
}
