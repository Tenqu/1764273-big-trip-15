import dayjs from 'dayjs';

export const getDateFormat = ((date) => dayjs(date).format('YYYY/MM/DD HH:mm'));
export const getDateISO = ((date) => dayjs(date).format('YYYY-MM-DDTHH:mm'));
export const getDateHoursMinutes = ((date) => dayjs(date).format('HH:mm'));
export const getDateMonthDay = ((date) => dayjs(date).format('MMM DD'));

export const generateDuration = (timeFrom, timeTo) => {
  const diff = dayjs(timeTo).diff(dayjs(timeFrom));

  switch (true) {
    case (diff <= 59) :
      return 'Date Error';
    case (diff / 60000 / 60) < 1:
      return dayjs(diff).format('mm[M]');
    case (diff / 60000 / 60) >= 1 && (diff / 60000 / 60) < 24:
      return dayjs(diff).format('HH[H] mm[M]');
    default:
      return dayjs(diff).format('DD[D] HH[H] mm[M]');
  }
};

export const isChecked = (type, currentType) => {
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
