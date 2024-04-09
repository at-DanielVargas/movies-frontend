export const api = {
  getTrendingMovies: async () => {
    const reponse = await fetch("http://localhost:3000/movies/trending");
    return reponse.json();
  },
  getMovie: async (id: string) => {
    const reponse = await fetch(`http://localhost:3000/movies/${id}`);
    return reponse.json();
  },

  searchMovies: async (query: string) => {
    const reponse = await fetch(
      `http://localhost:3000/movies/search?query=${query}`
    );
    return reponse.json();
  },

  getGenres: async () => {
    const reponse = await fetch(`http://localhost:3000/movies/categories`);
    return reponse.json();
  },

  getMoviesByCategory: async (categoryId: number, page: number) => {
    const reponse = await fetch(
      `http://localhost:3000/movies/by-category/${categoryId}?page=${page}`
    );
    return await reponse.json();
  },

  getRelatedMovies: async (id: number) => {
    const reponse = await fetch(`http://localhost:3000/movies/${id}/related`);
    return reponse.json();
  },
};
