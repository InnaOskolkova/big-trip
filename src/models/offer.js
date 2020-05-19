export default class OfferModel {
  static convertFromServerFormat(offer) {
    return {
      name: offer.title,
      price: offer.price
    };
  }

  static convertToServerFormat(offer) {
    return {
      title: offer.name,
      price: offer.price
    };
  }

  static convertGroupsFromServerFormat(groups) {
    return groups.reduce((typesToOffers, {type, offers}) => {
      typesToOffers[type] = offers.map(OfferModel.convertFromServerFormat);
      return typesToOffers;
    }, {});
  }
}
