import {EVENT_TYPES} from "../const";

import {getRandomIntegerIncludingMax} from "../utils/common";

const MAX_OFFER_AMOUNT = 5;

const generateOffersForType = (type) => {
  const totalOfferAmount = getRandomIntegerIncludingMax(MAX_OFFER_AMOUNT);
  let currentOfferAmount = 0;

  return new Array(totalOfferAmount).fill(``).map(() => {
    currentOfferAmount++;

    return {
      name: `${type} offer ${currentOfferAmount}`,
      price: 100 * currentOfferAmount
    };
  });
};

export const generateOffers = () => EVENT_TYPES.reduce((typesToOffers, type) => {
  typesToOffers[type] = generateOffersForType(type);
  return typesToOffers;
}, {});
