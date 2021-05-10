import Images from '../model/Images';

export default {
  Render(images: Images) {
    return {
      id: images.id,
      url: `http://localhost:3333/tmp/uploads/${images.name}`
    };
  },

  renderMany(images: Images[]) {
    return images.map((images) => this.Render(images))
  }
}