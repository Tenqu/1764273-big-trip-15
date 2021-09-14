import dayjs from 'dayjs';
const MIN_MINUTES = 59;
const MAX_MINUTES = 60;
const MAX_HOURS = 24;
const MAX_VALUE = 60000;
const MIN_VALUE = 1;

export const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
export const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
export const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
export const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));

export const generateDuration = (timeFrom, timeTo) => {
  const diff = dayjs(timeTo).diff(dayjs(timeFrom));

  switch (true) {
    case (diff <= MIN_MINUTES) :
      return 'Date Error';
    case (diff / MAX_VALUE / MAX_MINUTES) < MIN_VALUE:
      return dayjs(diff).format('mm[M]');
    case (diff / MAX_VALUE / MAX_MINUTES) >= MIN_VALUE && (diff / MAX_VALUE / MAX_MINUTES) < MAX_HOURS:
      return dayjs(diff).format('HH[H] mm[M]');
    default:
      return dayjs(diff).format('DD[D] HH[H] mm[M]');
  }
};

export const isCheckedType = (type, currentType) => {
  if  (type === currentType) {
    return 'checked';
  } return '';
};

export const totalPrice = (arr) => arr.slice().reduce((accumulator, it) => accumulator + it.basePrice, 0);

export const getDate = (arr) => {
  const fromDate = getDateMonthDay(arr[0].dateFrom, 'MMMM DD');
  const toDate = getDateMonthDay(arr[arr.length - 1].dateTo, 'MMMM DD');
  return { fromDate, toDate };
};

export const getDescription = (evt, destination) => {
  const destinations = destination.find((item) => item.name === evt.target.value);
  return destinations && destinations.description ? destinations.description : '';
};
export const getPhotos = (evt, destinations) => {
  const dest = destinations.find((item) => item.name === evt.target.value);
  return dest && dest.pictures ? dest.pictures : null;
};

export const getOffersValues = () => {
  const checkedOffers = Array.from(document.querySelectorAll('.event__offer-checkbox:checked'));
  const checkedOffersValues = checkedOffers.map((offers) => ({
    title: offers.dataset.title,
    price: parseInt(offers.dataset.price, 10),
  }));
  return checkedOffersValues;
};
