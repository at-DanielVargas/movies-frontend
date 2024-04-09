import { Genre } from "../../interfaces/Genere";

export async function MoviesLoader(): Promise<{genres: Genre[]}>{
    const options = {
        method: 'GET',
        headers: {
          'User-Agent': 'insomnia/8.6.1',
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjY4MDc1OWY0YjM4ODYwM2MzMDViNmY3ZGVmMDkwMSIsInN1YiI6IjY2MTFhYjk3MWYzMzE5MDE3ZGMyMzU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SB9KbEHy9sfEcjQvh0Ob-0TSt4osRx-QKHzoFvjhd6M'
        }
      };
      
      const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=12680759f4b388603c305b6f7def0901&language=es-ES', options)
        .then(response => response.json())
        .catch(err => console.error(err));

    return data.genres;
}