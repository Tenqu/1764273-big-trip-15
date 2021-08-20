import { getCities, totalPrice} from '../utils/trip';
import AbstractView from './abstract';

const createTripInfoTemplate = (data) => {
  const {firstCity, secondCity, thirdCity, fromDate, toDate} = getCities(data);
  if (data.length === 0) {
    return ' ';
  }
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${firstCity} — ${secondCity} — ${thirdCity}</h1>
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
