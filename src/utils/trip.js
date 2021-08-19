import dayjs from 'dayjs';
import { getRandomInteger } from './common';

export const generateDate = () => {
  const maxMinuteGap = 4320;
  const minutesGap = getRandomInteger(-maxMinuteGap, maxMinuteGap);
  return dayjs().add(minutesGap, 'minute').toDate();
};

export const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
export const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
export const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
export const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));

export const isChecked = (type, currentType) => {
  if  (type === currentType) {
    return 'checked';
  } return '';
};
