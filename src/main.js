import { createFilterTemplate } from './view/filter.js';
import { createMenuTemplate } from './view/site-menu.js';
import { createSortTemplate } from './view/sort.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createEditFormTemplate } from './view/edit-form.js';
import {createTripPointTemplate} from './view/trip-point.js';
import { generateData } from './mock/data.js';
import dayjs from 'dayjs';
import { render } from './utils/util.js';
const TRIP_POINTS = 15;

const data = new Array(TRIP_POINTS).fill().map(generateData);
const siteMainElement = document.querySelector('.trip-main');
const siteNavigationElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteTripEventsElement = document.querySelector('.trip-events');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

const sortTripPointsByStart = () => data.slice().sort((pointA, pointB) => dayjs(pointA.timeFrom).diff(pointB.timeFrom));
const tripPointsSortedByStart = sortTripPointsByStart(data);

render(siteMainElement, createTripInfoTemplate(tripPointsSortedByStart), 'afterbegin');//Информация
render(siteNavigationElement, createMenuTemplate()); //Меню
render(siteFilterElement, createFilterTemplate()); //Фильтр
render(siteTripEventsElement, createSortTemplate()); //Сортировка
//render(siteTripEventsElement, createAddFormTemplate(), 'afterbegin');//Форма создания

for (let i = 0; i < TRIP_POINTS; i++) {
  render(siteTripEventsElement, createTripPointTemplate(data[i]));
}

const siteTripEventsListElement = siteTripEventsElement.querySelector('.trip-events__list');//Точки маршрута
render(siteTripEventsListElement, createEditFormTemplate(data[0]), 'afterbegin');
