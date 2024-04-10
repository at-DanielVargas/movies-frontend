import { Genre } from "../../../interfaces/genre";

import { useQuery } from "react-query";
import { MoviesApi } from "../../../queries/api";
import { Molecules } from "../../molecules";
import { Atoms } from "../../atoms";

export interface GenresCarouselProps {
  genre: Genre;
}

function GenresCarousel({ genre }: GenresCarouselProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["genre-movies", genre.id],
    queryFn: () => MoviesApi.getMoviesByGenre(genre.id, 4),
  });

  const Item = (movie: any, index: number) => {
    return (
      <Atoms.Card
        key={`movie-${movie.id}-${index}`}
        title={movie.title}
        backgroundImage={movie.backdrop_path}
        metaTitle={movie.release_date}
        to={`/movie/${movie.id}`}
        stars={movie.vote_average}
        votes={movie.vote_count}
      />
    );
  };

  if (isLoading)
    return (
      <Molecules.Carousel
        title={genre.name}
        elements={[...Array(8)]}
        isLoading
        renderElement={Item}
      />
    );
  if (error) return <div>Error:</div>;

  return (
    <Molecules.Carousel
      title={genre.name}
      elements={data.results}
      renderElement={Item}
    />
  );
}

export default GenresCarousel;
