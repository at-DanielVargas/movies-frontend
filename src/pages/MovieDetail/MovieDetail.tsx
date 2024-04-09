import { ScrollRestoration, useParams } from "react-router-dom";

import {
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Overlay,
  Rating,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useQuery } from "react-query";
import { api } from "../../queries/api";
import BackgroundVideo from "../../components/BackgroundVideo/BackgroundVideo";
import RelatedCarousel from "../../components/RelatedCarousel/RelatedCarousel";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const { data: movieDetails } = useQuery<Record<string, any>>({
    queryKey: ["movieDetails", movieId],
    queryFn: () => api.getMovie(movieId ?? ""),
  });

  const director = movieDetails?.credits?.crew?.filter(
    (crew: any) => crew.job === "Director"
  );
  const directorName = director?.length ? director[0].name : "Unknown";
  const cast = movieDetails?.cast;
  const videoId = movieDetails?.videos?.filter(
    (video: any) => video.site === "YouTube"
  )[0]?.key;

  return (
    <>
      <Box pos="relative" h={480}>
        <BackgroundVideo
          placeholderImage={movieDetails?.backdrop_path}
          videoId={videoId}
        >
          <Flex
            mih="100%"
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            p="xl"
            style={{ zIndex: 2, position: "relative" }}
          >
            <Box>
              <Text fw={700} style={{ fontSize: "3rem" }}>
                {movieDetails?.title}
              </Text>
              <Text>{movieDetails?.tagline}</Text>
              <Group>
                <Text c="gray">{movieDetails?.release_date}</Text>
                <Divider orientation="vertical" />
                <Text>{movieDetails?.runtime} min</Text>
                <Divider orientation="vertical" />
                <Rating
                  value={Number(movieDetails?.vote_average)}
                  readOnly={true}
                  color="yellow"
                />
              </Group>
            </Box>
          </Flex>
        </BackgroundVideo>
        <Overlay
          gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
          zIndex={1}
        />
      </Box>

      <Box p="xl" pt={0}>
        <Grid>
          <Grid.Col span={7}>
            <Box>
              <Text size="xl" fw={700} mt="lg">
                Descipcion
              </Text>
              <Text>{movieDetails?.overview}</Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={5}>
            <Text size="xl" fw={700} mt="lg">
              Generos
            </Text>
            <Group mt="sm">
              {movieDetails?.genres?.map((genre: any) => (
                <Text key={genre.id} variant="outline" c="gray">
                  {genre.name}
                </Text>
              ))}
            </Group>
            <Text size="xl" fw={700} mt="lg">
              Director
            </Text>
            <Text>{directorName}</Text>
          </Grid.Col>
          <Grid.Col span={12}>
            <Box>
              <Text size="xl" fw={700} mt="lg">
                Reparto
              </Text>
              <Carousel
                slideSize="25%"
                slideGap="md"
                loop
                align="center"
                slidesToScroll={3}
              >
                {cast?.map((actor: any) => (
                  <Carousel.Slide key={actor.id}>
                    <Group>
                      <Image
                        src={actor.profile_path}
                        alt={actor.name}
                        radius="xl"
                        h={70}
                        w={70}
                        miw={70}
                        style={{ objectFit: "cover" }}
                      />
                      <Box>
                        <Text>{actor.name}</Text>
                        <Text c="gray">{actor.character}</Text>
                      </Box>
                    </Group>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
      {movieId && <RelatedCarousel movieId={Number(movieId)} />}
      <ScrollRestoration />
    </>
  );
}

export default MovieDetailsPage;
