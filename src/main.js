import SiteMenuView from './view/site-menu';
import FilterView from './view/filter';
import TripInfoView from './view/trip-info';
import { generatePoints } from './mock/data.js';
import { render, RenderPosition } from './utils/render';
import TripPresenter from './presenter/trip';

const POINTS_COUNT = 15;

const tripPoints = new Array(POINTS_COUNT).fill().map(generatePoints);

const siteMainElement = document.querySelector('.trip-main');
const siteNavigationElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

render(siteMainElement, new TripInfoView(tripPoints).getElement(), RenderPosition.AFTERBEGIN);//Информация
render(siteFilterElement, new FilterView().getElement(),RenderPosition.BEFOREEND); //Фильтр
render(siteNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); //Меню

const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripContainer);
tripPresenter.init(tripPoints);
