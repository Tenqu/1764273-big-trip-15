import { getPhoto } from '../mock/data';

export const KeyCode = {
  ESCAPE: 'Escape',
  Esc: 'Esc',
};

export const Dests = {
  Amsterdam: {
    name: 'Amsterdam',
    description:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pictures: getPhoto(),
  },
  Chamonix: {
    name: 'Chamonix',
    description: 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    pictures: getPhoto(),
  },
  Geneva: {
    name: 'Geneva',
    description: 'Aliquam erat volutpat.',
    pictures: getPhoto(),
  },
};
