import dayjs from 'dayjs';

export const render = (container, template, place='beforeend') => {
  container.insertAdjacentHTML(place, template);
};
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArray = (arr) => {
  const results = [];
  results.push(arr.slice(0, Math.ceil(Math.random() * arr.length)));
  return results;
};

export const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
export const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
export const getDateHM = ((date) => dayjs(date).format('HH:mm'));
export const getDateMD = ((date) => dayjs(date).format('MMM DD'));
