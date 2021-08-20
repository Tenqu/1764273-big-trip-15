import AbstractView from './abstract';

const createAddFormTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class AddForm extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createAddFormTemplate();
  }
}
