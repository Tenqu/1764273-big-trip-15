import { createElement } from '../utils/util';

const createAddFormTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class AddForm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAddFormTemplate();
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
