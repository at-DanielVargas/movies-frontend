import { Text, Overlay, Rating, Box, BackgroundImage } from "@mantine/core";
import { Link } from "react-router-dom";
export interface MovieCardProps {
  movie: Record<string, any>;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <Box mx="auto" style={{ height: "170px", position: "relative" }}>
        <BackgroundImage
          mih={170}
          src={`http://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
        >
          <Box p="md" miw="100%" style={{ position: "absolute", bottom: 0 }}>
            <Text c="white" fw={800}>
              {movie.title}
            </Text>
            <Text c="gray">{movie.release_date}</Text>
            <Rating
              defaultValue={(Number(movie.vote_average) / 10) * 5}
              readOnly={true}
              color="yellow"
            />
          </Box>
          <Overlay
            gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
            opacity={0.65}
          />
        </BackgroundImage>
      </Box>
    </Link>
  );
}

export default MovieCard;
