import Movies from '../model/Movies';
import ImagesView from './ImagesView';

export default {
  Render(movies: Movies) {
    return {
      nome: movies.name,
      tempo: movies.time,
      sinopse: movies.description,
      price: movies.price,
      images: ImagesView.Render(movies.images)
    }
  },

  renderMany(movies: Movies[]) {
    return movies.map((movies) => this.Render(movies))
  }
}