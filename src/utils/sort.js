export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;
export const sorByDay = (eventA, eventB) => eventA.timeFrom - eventB.timeFrom;
export const sorByTime = (pointA, pointB) => (pointB.timeTo - pointB.timeFrom) - (pointA.timeTo - pointA.timeFrom);
