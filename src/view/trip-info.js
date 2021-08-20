import { getCities, totalPrice} from '../utils/trip';
import AbstractView from './abstract';

const createTripInfoTemplate = (data) => {
  if (data.length === 0) {
    return ' ';
  }
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getCities(data)['firstCity']} — ${getCities(data)['secondCity']} — ${getCities(data)['thirdCity']}</h1>
    <p class="trip-info__dates">${getCities(data)['fromDate']}&nbsp;—&nbsp;${getCities(data)['toDate']}</p>
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
