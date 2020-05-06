import {eventGroupsToEventTypes} from "../const";

import {formatTime, formatFullDate} from "../utils/date";
import {upperCaseFirstLetter, getPreposition, replaceChars} from "../utils/text";

import AbstractSmartComponent from "./abstract-smart-component";

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

const createDestinationListMarkup = (availableDestinations) => (
  `<datalist id="destination-list">
    ${availableDestinations.map((destination) => `<option value="${destination.name}"></option>`).join(``)}
  </datalist>`
);

const createDestinationMarkup = (availableDestinations, checkedDestination, type) => (
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

    ${createDestinationListMarkup(availableDestinations)}

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

const createFavoriteButtonMarkup = (isChecked) => (
  `<input
    class="event__favorite-checkbox visually-hidden"
    id="event-favorite"
    type="checkbox"
    name="event-favorite"
    ${isChecked ? `checked` : ``}>
  <label
    class="event__favorite-btn"
    for="event-favorite">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </label>`
);

const createCloseButtonMarkup = () => (
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
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
  const {beginDate, endDate, price, isFavorite, offers} = event;
  const {type, destination, availableDestinations, availableOffers} = parameters;

  return (
    `<form class="event event--edit" action="#" method="post">

      <header class="event__header">

        ${createTypeMarkup(type)}
        ${createDestinationMarkup(availableDestinations, destination, type)}
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
          Delete
        </button>

        ${createFavoriteButtonMarkup(isFavorite)}

        ${createCloseButtonMarkup()}

      </header>

      ${createDetailsMarkup(destination, availableOffers, offers)}

    </form>`
  );
};

export default class Editor extends AbstractSmartComponent {
  constructor(event, availableDestinations, typesToOffers) {
    super();

    this._event = event;
    this._typesToOffers = typesToOffers;

    this._type = this._event.type;
    this._destination = this._event.destination;
    this._availableDestinations = availableDestinations;
    this._availableOffers = this._typesToOffers[this._type];

    this._submitHandler = null;
    this._favoriteButtonClickHandler = null;
    this._closeButtonClickHandler = null;
    this._changeHandler = this._changeHandler.bind(this);

    this._recoveryHandlers();
  }

  getTemplate() {
    return createEditorTemplate(this._event, {
      type: this._type,
      destination: this._destination,
      availableDestinations: this._availableDestinations,
      availableOffers: this._availableOffers
    });
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }

  setFavoriteButtonClickHandler(handler) {
    this._favoriteButtonClickHandler = handler;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteButtonClickHandler);
  }

  setCloseButtonClickHandler(handler) {
    this._closeButtonClickHandler = handler;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }

  reset() {
    this._type = this._event.type;
    this._destination = this._event.destination;
    this._availableOffers = this._typesToOffers[this._type];

    this.rerender();
  }

  _changeType(type) {
    this._type = type;
    this._availableOffers = this._typesToOffers[this._type];
    this.rerender();
  }

  _changeDestination(destinationName) {
    this._destination = this._availableDestinations.find((destination) => destination.name === destinationName);
    this.rerender();
  }

  _changeHandler(evt) {
    const target = evt.target;

    if (target.classList.contains(`event__type-input`)) {
      this._changeType(target.value);
    }

    if (target.classList.contains(`event__input--destination`)) {
      this._changeDestination(target.value);
    }
  }

  _recoveryHandlers() {
    if (this._submitHandler) {
      this.setSubmitHandler(this._submitHandler);
    }

    if (this._favoriteButtonClickHandler) {
      this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
    }

    if (this._closeButtonClickHandler) {
      this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    }

    this.getElement().addEventListener(`change`, this._changeHandler);
  }
}
