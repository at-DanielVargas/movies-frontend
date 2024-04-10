import {
  Card,
  Overlay,
  Text,
  Button,
  Group,
  Divider,
  Rating,
  LoadingOverlay,
  Grid,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "react-query";
import { MoviesApi } from "../../../queries/api";
import classes from "./MovieTrends.module.css";
import { useRef } from "react";

function MovieTrends() {
  const { data, isLoading } = useQuery(
    "trending-movies",
    MoviesApi.getTrendingMovies
  );

  const autoplay = useRef(Autoplay({ delay: 15000, stopOnMouseEnter: true }));

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <LoadingOverlay
          visible={true}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "red" }}
        />
      </div>
    );
  }

  return (
    <Carousel
      align="start"
      slideGap="xl"
      draggable={false}
      withIndicators
      withControls={false}
      plugins={[autoplay.current]}
    >
      {data.results.map((movie: any) => (
        <Carousel.Slide key={movie.id}>
          <Card
            radius="md"
            className={classes.card}
            style={{
              backgroundImage: `url(${movie.backdrop_path})`,
            }}
          >
            <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

            <div className={classes.content}>
              <Grid>
                <Grid.Col span={6}>
                  <Text className={classes.title}>{movie?.title}</Text>
                  <Text c="white" mb={10} visibleFrom="md">
                    {movie?.overview}
                  </Text>
                  <Group mb={10}>
                    <Text c="white">{movie?.release_date}</Text>
                    <Divider orientation="vertical" />
                    <Rating
                      value={Number(movie?.vote_average)}
                      readOnly={true}
                      color="yellow"
                    />
                  </Group>
                  <Button
                    className={classes.action}
                    color="red"
                  >
                    Agregar a mi lista
                  </Button>
                </Grid.Col>
              </Grid>
            </div>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default MovieTrends;
