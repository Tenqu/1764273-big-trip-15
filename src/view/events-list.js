import AbstractView from './abstract';

const createTripEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class EventsList extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripEventsListTemplate();
  }
}
