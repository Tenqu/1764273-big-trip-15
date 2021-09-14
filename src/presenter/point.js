import TripPointView from '../view/trip-point';
import EditFormView from '../view/edit-form';
import { remove, render, RenderPosition, replace } from '../utils/render';
import { Dests, KeyCode } from '../utils/consts';
import { OFFERS } from '../mock/consts';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor (pointsListContainer, changeData, changeMode) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._formComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePointEditClick = this._handlePointEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleClosePointEdit = this._handleClosePointEdit.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevFormComponent = this._formComponent;

    this._pointComponent = new TripPointView(point, OFFERS, Dests);
    this._formComponent = new EditFormView(point);

    this._pointComponent.setEditClickHandler(this._handlePointEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._formComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formComponent.setCloseEditHandler(this._handleClosePointEdit);

    if (prevPointComponent === null || prevFormComponent === null) {
      render(this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._formComponent, prevFormComponent);
    }

    remove(prevPointComponent);
    remove(prevFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._formComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._formComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeydownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._formComponent);
    document.removeEventListener('keydown', this._escKeydownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeydownHandler(evt) {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.Esc) {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handlePointEditClick() {
    this._replacePointToForm();
  }

  _handleClosePointEdit() {
    this._formComponent.reset(this._event);
    this._replaceFormToPoint();
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceFormToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }
}
