import { MovieDetails } from "types";

export interface MovieDetailsLoaderProps {
  movieId: number;
}

export async function MovieDetailsLoader({
  movieId,
}: MovieDetailsLoaderProps): Promise<MovieDetails> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjY4MDc1OWY0YjM4ODYwM2MzMDViNmY3ZGVmMDkwMSIsInN1YiI6IjY2MTFhYjk3MWYzMzE5MDE3ZGMyMzU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SB9KbEHy9sfEcjQvh0Ob-0TSt4osRx-QKHzoFvjhd6M",
    },
  };

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos%2Cimages%2Creviews%2Crecommendations%2Csimilar%2Ccredits&language=es-ES`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));


  return data;
}
