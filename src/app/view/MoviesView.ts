import Movies from '../model/Movies';

export default {
  Render(movies: Movies) {
    return {
      nome: movies.name,
      tempo: movies.time,
      sinopse: movies.description,
      price: movies.price
    }
  },

  renderMany(movies: Movies[]) {
    return movies.map((movies) => this.Render(movies))
  }
}