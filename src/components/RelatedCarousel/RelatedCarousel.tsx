import { Carousel } from "@mantine/carousel";
import { Box, Text } from "@mantine/core";
import RelatedCard from "../RelatedCard/RelatedCard";
import { useQuery } from "react-query";
import { api } from "../../queries/api";

export interface RelatedCarouselProps {
  movieId: number;
}

function RelatedCarousel({ movieId }: RelatedCarouselProps) {
  const { data: related } = useQuery<Record<string, any>>({
    queryKey: ["movieDetails", movieId],
    queryFn: () => api.getRelatedMovies(movieId),
  });

  return (
    <Box p="xl">
      <Text size="xl" fw={700} mt="lg">
        Relacionados
      </Text>
      {related?.length ? (
        <Carousel
          slideSize="25%"
          slideGap="md"
          loop
          align="center"
          slidesToScroll={3}
        >
          {related.map((movie: any) => (
            <Carousel.Slide key={movie.id}>
              <RelatedCard
                id={movie.id}
                image={movie.poster_path}
                title={movie.title}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Text>No se encontraron peliculas similares</Text>
      )}
    </Box>
  );
}

export default RelatedCarousel;
