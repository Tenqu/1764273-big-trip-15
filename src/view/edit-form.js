import { TRIP_POINT_TYPES } from '../mock/consts';
import { generateDestination, getOffers } from '../mock/data';
import { getRandomInteger } from '../utils/common';
import { getDateHoursMinutes } from '../utils/trip';
import { isChecked } from '../utils/trip';
import SmartView from './smart';

const createEventType = (type, currentType) => (
  `<div class="event__type-item">
  <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${isChecked(type.toLowerCase(), currentType.toLowerCase())}>
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`
);
const createEventTypeList = (currentType) => TRIP_POINT_TYPES.map((type) => createEventType(type, currentType));
const createEditFormTemplate = (data) => {
  const {type, destination, timeFrom, timeTo, price, offers} = data;
  const createPictureMarkup = () => destination.photo.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join(' ');
  const createOfferMarkup = (offer) =>
    `<div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id="${offer.title}" type="checkbox" name="event-offer-${offer.title}"}>
      <label class="event__offer-label" for="${offer.title}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="even__offer-price">${offer.price}</span>
      </label>
     </div>`;
  const dataListID = () => (
    `<datalist id="destination-list-1">
        <option value="${destination.name}"></option>
        <option value="${destination.name}"></option>
        <option value="${destination.name}"></option>
        </datalist>`
  );
  const offersMarkup = () => offers.map((item) => createOfferMarkup(item)).join(' ');
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
           ${createEventTypeList(type).join(' ')}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        ${dataListID()}
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${getDateHoursMinutes(timeFrom)}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${getDateHoursMinutes(timeTo)}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${price}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersMarkup()}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createPictureMarkup()}
        </div>
      </div>
        </section>
    </section>
  </form>
</li>`;
};

export default class EditForm extends SmartView {
  constructor(event, offers, destinations) {
    super();
    this._data = EditForm.parseEventToData(event);
    this._offers = offers;
    this._destinations = destinations;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._closeEditHandler = this._closeEditHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEditFormTemplate(this._data);
  }

  _closeEditHandler(evt) {
    evt.preventDefault();
    this._callback.closeEdit();
  }

  setCloseEditHandler(callback) {
    this._callback.closeEdit = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeEditHandler);
  }

  _typeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value,
      offers: getOffers(TRIP_POINT_TYPES[getRandomInteger(0, TRIP_POINT_TYPES.length - 1)]),
      destination: generateDestination(),
    });
  }

  _priceChangeHandler(evt) {
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _offerChangeHandler(evt) {
    this.updateData({
      offers: evt.target.value,
    }, true);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destChangeHandler);
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typeChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event__save-btn').addEventListener('submit', this._formSubmitHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseEditHandler(this._callback.closeEdit);
  }

  reset(event) {
    this.updateData(
      EditForm.parseEventToData(event),
    );
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDueDate;
    delete data.isRepeating;

    return data;
  }
}
