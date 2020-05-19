export default class DestinationModel {
  static convertFromServerFormat(destination) {
    return {
      name: destination.name,
      description: destination.description || ``,
      photos: destination.pictures.map(({src, description}) => ({src, alt: description}))
    };
  }

  static convertToServerFormat(destination) {
    return {
      name: destination.name,
      description: destination.description,
      pictures: destination.photos.map(({src, alt}) => ({src, description: alt}))
    };
  }
}
