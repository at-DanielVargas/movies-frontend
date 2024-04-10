import { Box } from "@mantine/core";
import { Organisms } from "../../organisms";

function Movies() {
  return (
    <Box p={10}>
      <Organisms.MovieTrends />
      <Organisms.CategoriesGrid />
    </Box>
  );
}

export default Movies;
