import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";

import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import MoviesPage from "./pages/Movies/Movies";
import MovieDetailsPage from "./pages/MovieDetail/MovieDetail";
import { MovieDetailsLoader } from "./pages/MovieDetail/MovieDetail.loader";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <MoviesPage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "tv-shows",
        element: <div>TV Shows</div>,
      },
      {
        path: "recently-added",
        element: <div>Recently Added</div>,
      },
      {
        path: "my-list",
        element: <div>My List</div>,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AnimatePresence>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AnimatePresence>
  );
}

export default App;
