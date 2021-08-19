import AbstractView from './Abstract';

const createTripEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripEventsList extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripEventsListTemplate();
  }
}
