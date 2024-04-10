import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layouts } from "./components/layouts";
import { Pages } from "./components/pages";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts.Home />,
    children: [
      {
        path: "/",
        element: <Pages.Movies />,
      },
      {
        path: "movies",
        element: <Pages.Movies />,
      },
      {
        path: "tv-shows",
        element: <Pages.TvShows />,
      },
      {
        path: "recently-added",
        element: <Pages.RecentlyAdded />,
      },
      {
        path: "my-list",
        element: <Pages.MyList />,
      },
      {
        path: "movie/:movieId",
        element: <Pages.MovieDetail />,
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
