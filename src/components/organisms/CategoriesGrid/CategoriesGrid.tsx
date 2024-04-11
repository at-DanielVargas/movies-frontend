import { useQuery } from "react-query";
import { MoviesApi } from "../../../queries/api";
import GenresCarousel from "../GenresCarousel/GenresCarousel";
import { Genre } from "../../../interfaces/genre";

function CategoriesGrid() {
  const {
    data: genres,
    error,
    isLoading,
  } = useQuery<Genre[]>("movie-categories", MoviesApi.getGenres);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:</div>;

  return (
    <>
      {genres?.map((genre: any) => (
        <GenresCarousel key={genre.id} genre={genre} />
      ))}
    </>
  );
}

export default CategoriesGrid;
