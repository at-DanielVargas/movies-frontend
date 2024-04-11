import {
  Box,
  Divider,
  Flex,
  Group,
  Text,
  Rating,
  Overlay,
  Grid,
} from "@mantine/core";
import { Organisms } from "../../organisms";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { MoviesApi } from "../../../queries/api";
import { Molecules } from "../../molecules";

function MovieDetail() {
  const { movieId } = useParams();

  const {
    data: details,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => MoviesApi.getMovie(movieId ?? ""),
  });

  const videoId = details?.videos[0]?.key;
  const director = details?.credits?.crew?.filter(
    (crew: any) => crew.job === "Director"
  );
  const cast = details?.cast;
  const directorName = director?.length ? director[0].name : "Desconocido";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <Box pos="relative" h={480}>
        <Organisms.BackgroundVideo
          placeholderImage={details.backdrop_path}
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
                {details?.title}
              </Text>
              <Text>{details?.tagline}</Text>
              <Group>
                <Text c="gray">{details?.release_date}</Text>
                <Divider orientation="vertical" />
                <Text>{details?.runtime} min</Text>
                <Divider orientation="vertical" />
                <Rating
                  value={Number(details?.vote_average)}
                  readOnly={true}
                  color="yellow"
                />
              </Group>
            </Box>
          </Flex>
        </Organisms.BackgroundVideo>
        <Overlay
          gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
          zIndex={1}
        />
      </Box>
      <Box p={10}>
        <Box p="xl" pt={0}>
          <Grid>
            <Grid.Col span={{ md: 7 }} order={{ base: 2, md: 1 }}>
              <Box>
                <Text size="xl" fw={700} mt="lg">
                  Descipcion
                </Text>
                <Text>{details?.overview}</Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ md: 5 }} order={{ base: 1, md: 2 }}>
              <Text size="xl" fw={700} mt="lg">
                Generos
              </Text>
              <Group mt="sm">
                {details?.genres?.map((genre: any) => (
                  <Text key={genre.id} variant="outline" c="gray">
                    {genre.name}
                  </Text>
                ))}
              </Group>
              <Text size="xl" fw={700} mt="lg">
                Director
              </Text>
              <Text variant="outline" c="gray">
                {directorName}
              </Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Box>
                <Molecules.Carousel
                  title="Reparto"
                  elements={cast}
                  renderElement={(item, index) => (
                    <Molecules.ActorCard
                      key={index}
                      actorName={item.name}
                      actorCharacter={item.character}
                      actorImage={item.profile_path}
                    />
                  )}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
        <Organisms.RelatedCarousel movieId={Number(movieId)} />
      </Box>
    </>
  );
}

export default MovieDetail;
