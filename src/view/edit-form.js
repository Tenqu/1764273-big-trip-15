
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import { OFFERS, TRIP_POINT_TYPES } from '../mock/consts';
import { getOffers } from '../mock/data';
import { getRandomInteger } from '../utils/common';
import { Dests } from '../utils/consts';
import {  getDateHoursMinutes, getOffersValues, isCheckedType} from '../utils/trip';
import SmartView from './smart';

const createEventType = (type, currentType) => (
  `<div class="event__type-item">
  <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${isCheckedType(type.toLowerCase(), currentType.toLowerCase())}>
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`
);

const createSingleDestinationOption = (typesOfDestinations) => {
  const options = Object.values(typesOfDestinations);
  return options.map((destination) => `<option value="${destination.name}"></option>`).join(' ');
};

const createDestinationOptions = (typesOfDestinations) => (
  `<datalist id="destination-list-1">
    ${createSingleDestinationOption(typesOfDestinations)}
  </datalist>`
);

const createOfferMarkup = (availableOffers, selectedOffers) =>
  `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">${availableOffers.map((offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').pop()}-1" type="checkbox" name="event-offer-${offer.title.split(' ').pop()}" ${(selectedOffers.find((item) => item.title === offer.title)) ? 'checked' : ''} >
  <label class="event__offer-label" for="event-offer-${offer.title.split(' ').pop()}-1">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
  </label>
  </div>`).join('\n')}
  </div>
</section>`;

const getAvailableOffers = (type, offers) => (offers.find((offer) => offer.type.toLowerCase() === type.toLowerCase())).offers;

const createEventTypeList = (currentType) => TRIP_POINT_TYPES.map((type) => createEventType(type, currentType));

const createEditFormTemplate = (data) => {
  const {type, destination, timeFrom, timeTo, basePrice, offers = []} = data;
  const createPictureMarkup = () => destination.pictures.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join(' ');
  const allOffers = getAvailableOffers(type, OFFERS);
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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination !== null ? destination.name : ''}" list="destination-list-1">
        ${createDestinationOptions(Dests)}
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${allOffers.length && createOfferMarkup(allOffers, offers) || ''}
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
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._closeEditHandler = this._closeEditHandler.bind(this);

    this._destChangeHandler = this._destChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);

    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickerStart();
    this._setDatepickerEnd();
  }

  getTemplate() {
    return createEditFormTemplate(this._data, this._offers, this._destinations);
  }

  _closeEditHandler(evt) {
    evt.preventDefault();
    this._callback.closeEdit();
  }

  setCloseEditHandler(callback) {
    this._callback.closeEdit = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeEditHandler);
  }

  _getNewDestination(requiredPoint) {
    const destinationTypes = Object.values(this._destinations);
    const requiredDestination = destinationTypes.find((point) => point.name === requiredPoint);
    return requiredDestination;
  }

  _destChangeHandler(evt) {
    this.updateData({
      destination: this._getNewDestination(evt.target.value),
    });
  }

  _typeChangeHandler(evt) {
    const type = TRIP_POINT_TYPES[getRandomInteger(0, TRIP_POINT_TYPES.length - 1)];
    this.updateData({
      type: evt.target.value,
      offers: getOffers(type),
    });
  }

  _priceChangeHandler(evt) {
    this.updateData({
      basePrice: parseInt(evt.target.value, 10),
    }, true);
  }

  _offerChangeHandler() {
    this.updateData({
      offers: getOffersValues(),
    }, true);
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destChangeHandler);
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typeChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler);
    const availableOffers = this.getElement().querySelector('.event__available-offers');
    if (availableOffers) {
      availableOffers.addEventListener('change', this._offerChangeHandler);
    }
  }

  _dateStartChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    }), true;
  }

  _dateEndChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    }), true;
  }

  _resetDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  _setDatepickerStart() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    this._datepickerStart = flatpickr(
      this.getElement().querySelector('input[name=event-start-time]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.timeFrom,
        maxDate: this._data.timeTo,
        enableTime: true,
        'time_24hr': true,
        onChange: this._dateStartChangeHandler,
      },
    );
  }

  _setDatepickerEnd() {
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerEnd = flatpickr(
      this.getElement().querySelector('input[name=event-end-time]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.timeTo,
        minDate: this._data.timeFrom,
        enableTime: true,
        'time_24hr': true,
        onChange: this._dateEndChangeHandler,
      },
    );
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
    this._setDatepickerStart();
    this._setDatepickerEnd();
    this.setCloseEditHandler(this._callback.closeEdit);
  }

  reset(event) {
    this.updateData(
      EditForm.parseEventToData(event),
    );
  }

  removeElement() {
    super.removeElement();
    this._resetDatepicker();
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    return data;
  }
}
