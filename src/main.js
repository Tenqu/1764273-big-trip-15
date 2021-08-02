import { createFilterTemplate } from './view/filter.js';
import { createAddFormTemplate } from './view/add-form.js';
import { createMenuTemplate } from './view/site-menu.js';
import { createSortTemplate } from './view/sort.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripEventsListTemplate } from './view/trip-events.js';
import { createTripCostTemplate } from './view/trip-cost.js';
import { createEditFormTemplate } from './view/edit-form.js';
import {createTripPointTemplate} from './view/trip-point.js';
const TRIP_POINTS = 3;

const render = (container, template, place='beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.page-header');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');

const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
render(siteNavigationElement, createMenuTemplate());
render(siteTripMainElement, createTripInfoTemplate(), 'afterbegin');

const siteTripInfoSection = siteTripMainElement.querySelector('.trip-main__trip-info');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
render(siteTripInfoSection, createTripCostTemplate());
render(siteFilterElement, createFilterTemplate());
render(siteTripEventsElement, createSortTemplate());
render(siteTripEventsElement, createTripEventsListTemplate());

const siteTripEventsListElement = siteTripEventsElement.querySelector('.trip-events__list');
render(siteTripEventsListElement, createEditFormTemplate());
render(siteTripEventsListElement, createAddFormTemplate());

for (let i = 0; i < TRIP_POINTS; i++) {
  render(siteTripEventsListElement, createTripPointTemplate());
}
