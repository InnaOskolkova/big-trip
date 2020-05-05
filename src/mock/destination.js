import {getRandomIntegerIncludingMax, getRandomElements} from "../utils/common";
import {splitTextIntoSentences} from "../utils/text";

const DESTINATIONS = [`Amsterdam`, `Berlin`, `Oslo`, `Rome`];
const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const MAX_PHOTO_AMOUNT = 6;

const generateDescription = () => getRandomElements(splitTextIntoSentences(DESCRIPTION)).join(` `);

const generatePhotos = () => new Array(getRandomIntegerIncludingMax(MAX_PHOTO_AMOUNT)).fill(``).map(() => ({
  src: `http://picsum.photos/248/152?r=${Math.random()}`,
  alt: `alt text`
}));

export const generateDestinations = () => DESTINATIONS.map((destination) => ({
  name: destination,
  description: generateDescription(),
  photos: generatePhotos()
}));
