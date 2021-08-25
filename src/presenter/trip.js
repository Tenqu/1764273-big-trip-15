import TripEventsView from '../view/trip-events';
import SortView from '../view/sort';
import EventsListView from '../view/events-list';
import NoPointView from '../view/no-point';
import { render, RenderPosition } from '../utils/render';
import { updateItem } from '../utils/common';
import PointPresenter from './point';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripPresenter = new Map();

    this._boardComponent = new TripEventsView();
    this._sortComponent = new SortView();
    this._eventListComponent = new EventsListView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();

    render(this._tripContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _handleModeChange() {
    this._tripPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._tripPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const tripPresenter = new PointPresenter(this._eventListComponent, this._handlePointChange, this._handleModeChange);
    tripPresenter.init(point);
    this._tripPresenter.set(point.id, tripPresenter);
  }

  _renderPoints(from, to) {
    this._points
      .slice(from, to)
      .forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._boardComponent, this._noPointComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPointList() {
    this._renderPoints();
  }

  _renderTrip() {
    if (this._points.every((point) => !point)) {
      this._renderNoPoints();
      return;
    }
    this._renderSort();
    this._renderPointList();
  }
}