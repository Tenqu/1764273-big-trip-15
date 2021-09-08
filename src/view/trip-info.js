import {getDate, totalPrice} from '../utils/trip';
import AbstractView from './abstract';
const getRouteDestinationList = (data) => {
  const routeNames = data.map((event) => event.destination.name);
  const filteredRouteNames = routeNames.filter((name, index) => routeNames.indexOf(name) === index);
  return filteredRouteNames;
};
const createTripInfoTemplate = (data) => {
  const {fromDate, toDate} = getDate(data);
  if (data.length === 0) {
    return ' ';
  }
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getRouteDestinationList(data).join('&nbsp;&mdash;&nbsp;')}</h1>
    <p class="trip-info__dates">${fromDate}&nbsp;—&nbsp;${toDate}</p>
  </div>
  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice(data)}</span>
  </p>
</section>`;
};

export default class TripInfo extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createTripInfoTemplate(this._data);
  }
}
