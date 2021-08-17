import dayjs from 'dayjs';
import { createElement } from '../utils/util';

const createTripInfoTemplate = (data) => {
  const MAX_PATH_DISPLAY_LENGTH = 3;
  let totalCost = 0;

  const getTripDate = () => {
    const startDate = dayjs(data[0].timeFrom).format('MMM D');
    const endDate = dayjs(data[data.length - 1].timeFrom).format('MMM D');

    return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
  };

  const tripPath = data.reduce((path, point, index) => {
    const {destination, offers, price } = point;
    totalCost += price;
    if (offers) {
      offers.forEach(() => totalCost += price);
    }
    if (index === 0 || path[path.length - 1] !== destination.name) {
      path.push(destination.name);
    }
    return path;
  }, []);

  const tripPathString = () => {
    if (tripPath.length > MAX_PATH_DISPLAY_LENGTH) {
      return `${tripPath[0]} ... ${tripPath[tripPath.length - 1]}`;
    } else if (tripPath.length <= MAX_PATH_DISPLAY_LENGTH) {
      return tripPath.join(' &mdash; ');
    }
  };

  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripPathString()}</h1>
        <p class="trip-info__dates">${data.length ? getTripDate() : ''}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`;
};

export default class TripInfo {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
