import dayjs from 'dayjs';

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOURS = 3600000;

export const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
export const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
export const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
export const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));

export const getDueDate = (timeFrom, timeTo) => {
  const startDate = dayjs(getDateFormat(timeFrom));
  const endDate = dayjs(getDateFormat(timeTo));
  const deuDate = endDate.diff(startDate);
  if (deuDate <= MILLISECONDS_IN_DAY) {
    return `${dayjs(deuDate).format('hh')  }H ${  dayjs(deuDate).format('mm')  }M`;
  }else if (deuDate > MILLISECONDS_IN_DAY) {
    return `${dayjs(deuDate).format('DD')  }D ${  dayjs(deuDate).format('DD')  }H ${  dayjs(deuDate).format('mm')  }M`;
  } else if (deuDate <= MILLISECONDS_IN_HOURS) {
    return `${dayjs(deuDate).format('mm')  }M`;
  }
};

export const isChecked = (type, currentType) => {
  if  (type === currentType) {
    return 'checked';
  } return '';
};

export const totalPrice = (arr) => arr.slice().reduce((accumulator, it) => accumulator + it.price, 0);

export const getCities = (arr) => {
  const cities = arr.slice().map((it) => it.destination.name);
  const firstCity = cities[0];
  const thirdCity = cities[cities.length - 1];
  const secondCity = cities.length === 3 ? cities[1] : '...';
  const fromDate = getDateMonthDay(arr[0].dateFrom, 'MMMM DD');
  const toDate = getDateMonthDay(arr[arr.length - 1].dateTo, 'MMMM DD');
  return { firstCity, secondCity, thirdCity, fromDate, toDate };
};
