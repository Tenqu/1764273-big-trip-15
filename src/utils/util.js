import dayjs from 'dayjs';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newContainer = document.createElement('div');
  newContainer.innerHTML = template;
  return newContainer.firstElementChild;
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

export const generateDate = () => {
  const maxMinuteGap = 4320;
  const minutesGap = getRandomInteger(-maxMinuteGap, maxMinuteGap);
  return dayjs().add(minutesGap, 'minute').toDate();
};

export const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
export const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
export const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
export const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));

