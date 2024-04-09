import {
  Card,
  Overlay,
  Text,
  Button,
  Box,
  Group,
  Divider,
  Rating,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "react-query";
import { api } from "../../queries/api";
import classes from "./MovieTrends.module.css";
import { useRef } from "react";

function MovieTrends() {
  const { data, isLoading } = useQuery(
    "trending-movies",
    api.getTrendingMovies
  );

  const autoplay = useRef(Autoplay({ delay: 2000 }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data.results);

  return (
    <Carousel
      classNames={classes}
      align="start"
      slideGap="xl"
      draggable={false}
      withIndicators
      withControls={false}
      plugins={[autoplay.current]}
    >
      {data.results.map((movie: any) => (
        <Carousel.Slide>
          <Card
            radius="md"
            className={classes.card}
            style={{
              backgroundImage: `url(${movie.backdrop_path})`,
            }}
          >
            <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

            <div className={classes.content}>
              <Box>
                <Text className={classes.title}>
                  {movie?.title}
                </Text>
                <Text>{movie?.tagline}</Text>
                <Group>
                  <Text c="gray">{movie?.release_date}</Text>
                  <Divider orientation="vertical" />
                  <Text>{movie?.runtime} min</Text>
                  <Divider orientation="vertical" />
                  <Rating
                    value={Number(movie?.vote_average)}
                    readOnly={true}
                    color="yellow"
                  />
                </Group>
              </Box>

              <Button
                className={classes.action}
                variant="white"
                color="dark"
                size="xs"
              >
                Book now
              </Button>
            </div>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default MovieTrends;
