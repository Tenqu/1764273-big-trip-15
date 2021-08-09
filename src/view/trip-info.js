import dayjs from 'dayjs';
export const createTripInfoTemplate = (data) => {
  const MAX_PATH_DISPLAY_LENGTH = 3;
  let totalCost = 0;

  const getTripInfo = () => {
    const startDate = dayjs(data[0].timeFrom).format('MMM D');
    const endDate = dayjs(data[data.length - 1].timeFrom).format('MMM D');

    return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
  };

  const tripPath = data.reduce((path, point, index) => {
    const {name, offers, price } = point;
    totalCost += price;
    if (offers) {
      offers.forEach(() => totalCost += price);
    }
    if (index === 0 || path[path.length - 1] !== name) {
      path.push(name);
    }
    return path;
  }, []);

  const tripPathString = () => {
    if (tripPath.length > MAX_PATH_DISPLAY_LENGTH) {
      return `${tripPath[0]} ... ${tripPath[tripPath.length - 1]}`;
    } else if (tripPath.length <= MAX_PATH_DISPLAY_LENGTH) {
      return tripPath.join(' &mdash; ');
    }
  };

  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripPathString()}</h1>
        <p class="trip-info__dates">${data.length ? getTripInfo() : ''}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`;
};
