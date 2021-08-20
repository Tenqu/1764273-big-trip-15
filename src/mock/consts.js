export const CITIES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

export const DESTINATIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const offerType = {
  FLIGHT: 'Flight',
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  CHECK_IN: 'Check-in',
  SIGTHSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};
export const TRIP_POINT_TYPES = [
  offerType.FLIGHT,
  offerType.TAXI,
  offerType.BUS,
  offerType.TRAIN,
  offerType.SHIP,
  offerType.TRAIN,
  offerType.CHECK_IN,
  offerType.SIGTHSEEING,
  offerType.RESTAURANT,
];

export const OFFERS = [
  {
    type: offerType.FLIGHT,
    offers: [
      {
        title: 'Choose meal',
        price: '180',
        name: 'meal',
      },
      {
        title: 'Switch to comfort class',
        price: '100',
        name: 'comfort',
      },
      {
        title: 'Add luggage',
        price: '30',
        name: 'luggage',
      },
      {
        title: 'Choose seats',
        price: '25',
        name: 'seats',
      },
      {
        title: 'Take pet on board',
        price: '50',
        name: 'pet',
      },
    ]},
  {
    type: offerType.TAXI,
    offers: [
      {
        title: 'Kid\'s sit',
        price: '20',
        name: 'sit',
      },
      {
        title: 'With pet',
        price: '10',
        name: 'pet',
      },
      {
        title: 'Comfort',
        price: '30',
        name: 'comfort',
      },
    ],
  },
  {
    type: offerType.BUS,
    offers: [
      {
        title: 'Front seat',
        price: '20',
        name: 'seat',
      },
      {
        title: 'Free food',
        price: '10',
        name: 'food',
      },
    ],
  },
  {
    type: offerType.TRAIN,
    offers: [
      {
        title: 'Large seats',
        price: '20',
        name: 'seats',
      },
    ],
  },
  {
    type: offerType.SHIP,
    offers: [
      {
        title: 'Luxury food',
        price: '50',
        name: 'lfood',
      },
      {
        title: 'With pet',
        price: '10',
        name: 'pet',
      },
    ],
  },
  {
    type: offerType.DRIVE,
    offers: [
      {
        title: 'Mercedes',
        price: '20',
        name: 'mercedes',
      },
      {
        title: 'Toll road',
        price: '50',
        name: 'road',
      },
    ],
  },
  {
    type: offerType.CHECK_IN,
    offers: [
      {
        title: '2 bedroom',
        price: '20',
        name: 'bedroom',
      },
      {
        title: 'Breakfast',
        price: '50',
        name: 'breakfast',
      },
    ],
  },
  {
    type: offerType.SIGTHSEEING,
    offers: [
      {
        title: 'Red Square',
        price: '20',
        name: 'square',
      },
      {
        title: 'Shop',
        price: '50',
        name: 'shop',
      },
    ],
  },
  {
    type: 'Restaurant',
    offers: [
      {
        title: 'Kid\'s sit',
        price: '20',
        name: 'sit',
      },
      {
        title: 'Stake',
        price: '30',
        name: 'stake',
      },
    ],
  },
];
