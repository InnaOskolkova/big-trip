import DestinationModel from "./destination";
import OfferModel from "./offer";

export default class EventModel {
  static convertFromServerFormat(event) {
    return {
      id: event.id,
      type: event.type,
      destination: DestinationModel.convertFromServerFormat(event.destination),
      beginDate: new Date(event[`date_from`]),
      endDate: new Date(event[`date_to`]),
      price: event[`base_price`],
      isFavorite: event[`is_favorite`],
      offers: event.offers.map(OfferModel.convertFromServerFormat)
    };
  }

  static convertToServerFormat(event) {
    return {
      "id": event.id,
      "type": event.type,
      "destination": DestinationModel.convertToServerFormat(event.destination),
      "date_from": event.beginDate.toISOString(),
      "date_to": event.endDate.toISOString(),
      "base_price": event.price,
      "is_favorite": event.isFavorite,
      "offers": event.offers.map(OfferModel.convertToServerFormat)
    };
  }
}
