export const MoviesApi = {
  /* The `getTrendingMovies` function is an asynchronous function that makes a GET request to the API
  endpoint `${import.meta.env.VITE_API_URL}/movies/trending` to fetch trending movies data. It then
  returns the JSON response from the API call. */
  getTrendingMovies: async () => {
    const reponse = await fetch(`${import.meta.env.VITE_API_URL}/movies/trending`);
    return reponse.json();
  },
  /* The `getMovie` function is an asynchronous function that takes an `id` parameter of type string.
  It makes a GET request to the API endpoint `${import.meta.env.VITE_API_URL}/movies/` to fetch
  data for a specific movie based on the provided `id`. It then returns the JSON response from the
  API call, which likely contains information about the movie with the specified `id`. */
  getMovie: async (id: string) => {
    const reponse = await fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`);
    return reponse.json();
  },
  /* The `searchMovies` function is an asynchronous function that takes a `query` parameter of type
  string. It makes a GET request to the API endpoint
  `${import.meta.env.VITE_API_URL}/movies/search?query=` to search for movies based on the
  provided query string. The function then returns the JSON response from the API call, which likely
  contains information about the movies that match the search query. */
  searchMovies: async (query: string) => {
    const reponse = await fetch(
      `${import.meta.env.VITE_API_URL}/movies/search?query=${query}`
    );
    return reponse.json();
  },

  /* The `getGenres` function is an asynchronous function that makes a GET request to the API endpoint
  `${import.meta.env.VITE_API_URL}/movies/categories` to fetch data about movie genres. It then
  returns the JSON response from the API call, which likely contains information about the available
  genres for movies. */
  getGenres: async () => {
    const reponse = await fetch(`${import.meta.env.VITE_API_URL}/movies/categories`);
    return reponse.json();
  },

  /* The `getMoviesByGenre` function is an asynchronous function that takes two parameters:
  `categoryId` of type number and `page` of type number. */
  getMoviesByGenre: async (categoryId: number, page: number) => {
    const reponse = await fetch(
      `${import.meta.env.VITE_API_URL}/movies/by-category/${categoryId}?page=${page}`
    );
    return await reponse.json();
  },

  /* The `getRelatedMovies` function is an asynchronous function that takes an `id` parameter of type
  number. It makes a GET request to the API endpoint
  `${import.meta.env.VITE_API_URL}/movies//related` to fetch related movies data based on the
  provided `id`. It then returns the JSON response from the API call, which likely contains
  information about movies related to the movie with the specified `id`. */
  getRelatedMovies: async (id: number) => {
    const reponse = await fetch(`${import.meta.env.VITE_API_URL}/movies/${id}/related`);
    return reponse.json();
  },
};
