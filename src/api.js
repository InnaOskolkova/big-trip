import {SERVER_URL, ServerRequestMethod, ServerResponseStatus} from "./const";

import DestinationModel from "./models/destination";
import OfferModel from "./models/offer";
import EventModel from "./models/event";

const checkResponseStatus = (response) => {
  const status = response.status;
  const statusText = response.statusText;

  if (status >= ServerResponseStatus.SUCCESS && status < ServerResponseStatus.REDIRECTION) {
    return response;
  }

  throw new Error(`${status}: ${statusText}`);
};

export default class API {
  constructor(token) {
    this._token = token;
  }

  getDestinations() {
    return this._sendRequest({url: `destinations`})
      .then((response) => response.json())
      .then((destinations) => destinations.map(DestinationModel.convertFromServerFormat));
  }

  getOffers() {
    return this._sendRequest({url: `offers`})
      .then((response) => response.json())
      .then(OfferModel.convertGroupsFromServerFormat);
  }

  getEvents() {
    return this._sendRequest({url: `points`})
      .then((response) => response.json())
      .then((events) => events.map(EventModel.convertFromServerFormat));
  }

  updateEvent(id, event) {
    return this._sendRequest({
      url: `points/${id}`,
      method: ServerRequestMethod.PUT,
      headers: new Headers({"Content-Type": `application/json`}),
      body: JSON.stringify(EventModel.convertToServerFormat(event))
    }).then((response) => response.json())
      .then(EventModel.convertFromServerFormat);
  }

  _sendRequest({url, method = ServerRequestMethod.GET, headers = new Headers(), body = null}) {
    headers.append(`Authorization`, this._token);
    return fetch(`${SERVER_URL}/${url}`, {method, headers, body})
      .then(checkResponseStatus);
  }
}
