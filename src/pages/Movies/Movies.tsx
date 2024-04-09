import CategoryCarousel from "../../components/Carousel/Carousel";
import { useQuery } from "react-query";
import { api } from "../../queries/api";
import MovieTrends from "../../components/MovieTrends/MovieTrends";

export interface Genre {
  id: number;
  name: string;
}

function MoviesPage() {
  const {
    data: genres,
    isLoading,
    error,
  } = useQuery<Genre[]>("genres", api.getGenres);

  return (
    <div>
      <MovieTrends />

      {error ? <div>Error:</div> : null}

      {isLoading && <div>Loading...</div>}

      {genres?.map((genre) => (
        <CategoryCarousel key={genre.id} genre={genre} />
      ))}
    </div>
  );
}

export default MoviesPage;
