import { Box, Text } from "@mantine/core";
import { useQuery } from "react-query";
import { Molecules } from "../../molecules";
import { MoviesApi } from "../../../queries/api";
import { Atoms } from "../../atoms";

export interface RelatedCarouselProps {
  movieId: number;
}

function RelatedCarousel({ movieId }: RelatedCarouselProps) {
  const { data: related } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => MoviesApi.getRelatedMovies(movieId),
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

  return (
    <Box p="xl">
      {related?.length ? (
        <Molecules.Carousel title="Peliculas similares" elements={related} renderElement={Item} />
      ) : (
        <Text>No se encontraron peliculas similares</Text>
      )}
    </Box>
  );
}

export default RelatedCarousel;
