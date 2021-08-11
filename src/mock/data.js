import dayjs from 'dayjs';
import { CITIES, DESTINATIONS, TRIP_POINT_TYPES, OFFERS } from '../utils/consts';
import { getRandomInteger } from '../utils/util';

const HOURS_GAP = 24;
const MIN_HOURS_DURATION = 1;
const MAX_HOURS_DURATION = 168;

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

const getOffers = (name) => {
  const result = OFFERS.find((item) => item.type === name);
  return result.offers;
};

export const generateData = () => {
  const type = TRIP_POINT_TYPES[getRandomInteger(0, TRIP_POINT_TYPES.length - 1)];
  const startTime = dayjs().add(getRandomInteger(-HOURS_GAP, HOURS_GAP), 'hour').toDate();
  const endTime = dayjs(startTime).add(getRandomInteger(MIN_HOURS_DURATION, MAX_HOURS_DURATION), 'minute').toDate();
  const destinations = {
    description: DESTINATIONS[getRandomInteger(1, DESTINATIONS.length - 1)],
    name: CITIES[getRandomInteger(1, CITIES.length - 1)],
    photo: getPhoto(),
  };
  return {
    type,
    timeFrom: startTime,
    timeTo: endTime,
    destination: destinations,
    price: getRandomInteger(5, 200),
    offers: getOffers(type),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};
