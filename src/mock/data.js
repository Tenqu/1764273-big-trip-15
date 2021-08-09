import dayjs from 'dayjs';
import { CITIES, DESTINATIONS, TRIP_POINT_TYPES } from '../utils/consts';
import { getRandomArray, getRandomInteger } from '../utils/util';

const HOURS_GAP = 24;
const MIN_HOURS_DURATION = 1;
const MAX_HOURS_DURATION = 168;

const generateOffers = () => {
  const OFFERS_TITLES = ['Order Uber', 'Rent a car', 'Add luggage', 'Switch to comfort', 'Add meal',
    'Choose seats', 'Travel by train', 'Add breakfast', 'Book tickets', 'Lunch in city',
  ];
  const OFFERS_PRICES = [20, 200, 30, 100, 15, 5, 40, 50];
  return {
    title: OFFERS_TITLES[getRandomInteger(0, OFFERS_TITLES.length -1)],
    price: OFFERS_PRICES[getRandomInteger(0, OFFERS_PRICES.length -1)],
  };
};

const getOffers = function() {
  return new Array(getRandomInteger(1, 5)).fill().map(() => generateOffers());
};

const generatePhoto = () => {
  const photosNumber = getRandomInteger(1,100);
  return {
    src: `http://picsum.photos/248/152?r=${photosNumber}`,
    description: 'Some beautiful place',
  };
};

const getPhoto = function () {
  return  new Array(getRandomInteger(1, 5)).fill().map(() => generatePhoto());
};


export const generateData = () => {
  const startTime = dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate();
  const endTime = dayjs(startTime).add(getRandomInteger(MIN_HOURS_DURATION, MAX_HOURS_DURATION), 'minute').toDate();
  return {
    type: TRIP_POINT_TYPES[getRandomInteger(0, TRIP_POINT_TYPES.length - 1)],
    name: CITIES[getRandomInteger(0, CITIES.length - 1)],
    timeFrom: startTime,
    timeTo: endTime,
    price: getRandomInteger(5, 200),
    offers: getOffers(),
    info:getRandomArray(DESTINATIONS).slice(1, 5).join(' '),
    photo: getPhoto(),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};
