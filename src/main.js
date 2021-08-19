import SiteMenuView from './view/site-menu';
import TripPointView from './view/trip-point';
import TripEventsList from './view/trip-events';
import EditFormView from './view/edit-form';
import AddFormView from './view/add-form';
import SortView from './view/sort';
import FilterView from './view/filter';
import TripInfoView from './view/trip-info';
import { generatePoints } from './mock/data.js';
import { render, RenderPosition, replace } from './utils/render';
import dayjs from 'dayjs';

const POINTS_COUNT = 15;

const tripPoints = new Array(POINTS_COUNT).fill().map(generatePoints);
const tripPointsList = new TripEventsList();
const sortTripPointsByStart = () => tripPoints.slice().sort((pointA, pointB) => dayjs(pointA.timeFrom).diff(pointB.timeFrom));
const tripPointsSortedByStart = sortTripPointsByStart(tripPoints);

const siteMainElement = document.querySelector('.trip-main');
const siteNavigationElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteTripEventsElement = document.querySelector('.trip-events');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

const renderPoint = (pointsListElement, task) => {
  const pointComponent = new TripPointView(task);
  const formComponent = new EditFormView(task);

  const replaceFormToPoint = () => {
    replace(pointComponent, formComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const replacePointToForm = () => {
    replace(formComponent, pointComponent);
    document.addEventListener('keydown', onEscKeyDown);
  };

  pointComponent.setRollupBtnClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  formComponent.setFormSubmitHadler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  formComponent.setRollupBtnClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointsListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteFilterElement, new FilterView().getElement(),RenderPosition.BEFOREEND); //Фильтр
render(siteNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); //Меню

if (tripPoints.length) {
  render(siteTripEventsElement, tripPointsList.getElement(), RenderPosition.BEFOREEND);//Точки маршрута
  for (const point of tripPoints) {
    renderPoint(tripPointsList.getElement(), point);
  }
  render(siteTripEventsElement, new SortView().getElement(), RenderPosition.AFTERBEGIN); //Сортировка
  render(siteMainElement, new TripInfoView(tripPointsSortedByStart).getElement(), RenderPosition.AFTERBEGIN);//Информация
} else {
  render(siteTripEventsElement, new AddFormView().getElement(), RenderPosition.AFTERBEGIN); //Пустая форма
}
